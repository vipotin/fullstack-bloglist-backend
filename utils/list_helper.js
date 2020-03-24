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

module.exports = {
  dummy,
  totalLikes
}