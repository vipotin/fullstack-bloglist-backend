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

const mostBlogs= blogs => {
  const authors = lodash.groupBy(blogs, b => b.author)
  let max = 0
  let mostBlogsAuthor = ''

  for (const author in authors) {
    const count = authors[author].length
    if (count > max) {
      max = count
      mostBlogsAuthor = author
    }
  }
  return {
    author: mostBlogsAuthor,
    blogs: max
  }
}

const mostLikes = blogs => {
  const reducer = (sum, value) => sum + value

  const authors = lodash.groupBy(blogs, b => b.author)
  let maxLikes = 0
  let likedAuthor = ''

  for (const author in authors) {
    const likes = authors[author].map(b => b.likes).reduce(reducer)
    if (likes > maxLikes) {
      maxLikes = likes
      likedAuthor = author
    }
  }
  return {
    author: likedAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}