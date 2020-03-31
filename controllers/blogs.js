const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exeption) {
    next(exeption)
  }
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
    const decodedToken = jwt.verify(request.token, process.env.VALIDATION)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog(request.body)
    blog.user = user._id
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

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
    console.log(request.token)
    const decodedToken = jwt.verify(request.token, process.env.VALIDATION)
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (user && blog && blog.user.toString() === user._id.toString()){
      await Blog.findByIdAndDelete(request.params.id)
      user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString())
      response.status(204).end()
    }
  } catch (exeption) {
    next(exeption)
  }
})

module.exports = blogsRouter