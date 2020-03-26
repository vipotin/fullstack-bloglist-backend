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

describe('GET /api/blogs tests', () => {
  test('all blogs are returned in json format', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }),
  test('the amount of returned blogs is correct', async () => {
    const response = await api.get('/api/blogs') 
    expect(response.body.length).toBe(6)
  })
})

afterAll(() => {
  mongoose.connection.close()
})