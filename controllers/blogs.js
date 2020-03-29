const blogsRouter = require('express').Router()
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
    const users = await User.find({})
    const user = users[0]
    // console.log(users, user)

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user._id
    })
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
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exeption) {
    next(exeption)
  }
})

module.exports = blogsRouter