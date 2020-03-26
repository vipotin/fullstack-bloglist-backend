const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exeption) {
    next(exeption)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    console.log(blog)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (exeption) {
    next(exeption)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const blog = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exeption) {
    next(exeption)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exeption) {
    next(exeption)
  }
})

module.exports = blogsRouter