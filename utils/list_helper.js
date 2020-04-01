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

const mostBlogs = blogs => {

  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1
    }
  }
  const sortedBlogs = lodash.sortBy(blogs, blog => blog.author)

  let obj = {
    maxCount: 0,
    maxAuthor: '',
    count: 0,
    previousAuthor: ''
  }

  sortedBlogs.forEach((blog, i, arr) => {  
    const isLastItem = i === arr.length - 1
    if (obj.previousAuthor !== blog.author || isLastItem) {
      if (isLastItem) {
        obj.count++
      }
      if (obj.count > obj.maxCount) {
        obj.maxCount = obj.count
        obj.maxAuthor = obj.previousAuthor
      }
      obj.count = 0
    }
    obj.count++
    obj.previousAuthor = blog.author
  })
  return {
    author: obj.maxAuthor,
    blogs: obj.maxCount
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}