const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const testData = require('../utils/testdata')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testData.listWithMultipleBlogs)
})

describe('GET /api/blogs', () => {
  test('all blogs are returned in json format', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }),
  test('the amount of returned blogs is correct', async () => {
    const response = await api.get('/api/blogs') 
    expect(response.body.length).toBe(testData.listWithMultipleBlogs.length)
  })
})

describe('POST /api/blogs', () => {
  test('a new blog is added', async () => {
    const newBlog = {
      title: 'How To Run A Successful Remote User Study',
      author: 'John',
      url: 'https://theuxblog.com/blog/remote-user-testing',
      likes: 3
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)

    expect(response.body.length).toBe(testData.listWithMultipleBlogs.length + 1)
    expect(titles).toContain('How To Run A Successful Remote User Study')
  })
})

test('id format is correct', async () => {
  const blogs = await api.get('/api/blogs')
  blogs.body.map(b => expect(b.id).toBeDefined())
})

afterAll(() => {
  mongoose.connection.close()
})