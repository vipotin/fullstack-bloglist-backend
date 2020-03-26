const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (total, value) => {
    return total + value
  }
  return blogs.length === 0 ? 0 
    : blogs.map(blog => blog.likes).reduce(reducer)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, current) => {
    return current.likes > max.likes ? current : max
  }
  if (blogs.length === 0) return 0
  
  const favorite = blogs.reduce(reducer)

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

// Template for 4.6*
const mostBlogs = blogs => {
  const sortedBlogs = lodash.sortBy(blogs, blog => blog.author)
  const reducer = (object, currentBlog) => {
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}