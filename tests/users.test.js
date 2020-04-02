// Example tests from chapter 4
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./testdata')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'gaga',
      name: 'Lady Gaga',
      password: 'pokerface'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'new',
      password: 'newpw'
    }

    await api
      .post('/api/users')
      .send(newUser)

    const response = await api
      .post('/api/users')
      .send(newUser)
    console.log(response.error.name)

    expect(response.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'uusi',
      name: 'uu si',
      password: '12'
    }

    await api
      .post('/api/users')
      .send(newUser)

    const response = await api
      .post('/api/users')
      .send(newUser)

    expect(response.body.error).toContain('Password too short')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  User.deleteMany({})
  mongoose.connection.close()
})