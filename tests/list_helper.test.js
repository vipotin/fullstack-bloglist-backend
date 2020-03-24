const listHelper = require('../utils/list_helper')

// Data

const listWithMultipleBlogs = [ 
  { 
    _id: '5a422a851b54a676234d17f7', 
    title: 'React patterns', 
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/', 
    likes: 7, 
    __v: 0 
  }, 
  { 
    _id: '5a422aa71b54a676234d17f8', 
    title: 'Go To Statement Considered Harmful', 
    author: 'Edsger W. Dijkstra', 
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 
    likes: 5, 
    __v: 0 
  }, 
  { 
    _id: '5a422b3a1b54a676234d17f9', 
    title: 'Canonical string reduction', 
    author: 'Edsger W. Dijkstra', 
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', 
    likes: 12, 
    __v: 0 
  }, 
  { _id: '5a422b891b54a676234d17fa', 
    title: 'First class tests', 
    author: 'Robert C. Martin', 
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', 
    likes: 10, 
    __v: 0 
  }, 
  { 
    _id: '5a422ba71b54a676234d17fb', 
    title: 'TDD harms architecture', 
    author: 'Robert C. Martin', 
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', 
    likes: 0, 
    __v: 0 
  }, 
  { 
    _id: '5a422bc61b54a676234d17fc', 
    title: 'Type wars', 
    author: 'Robert C. Martin', 
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 
    likes: 2, 
    __v: 0 
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

// Tests

describe('favorite blog', () => {
  test('favorite blog equals the only blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog))
      .toEqual(
        {
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          likes: 5
        })
  })

  test('favorite blog equals the blog with the most likes', () => {
    expect(listHelper.favoriteBlog(listWithMultipleBlogs))
      .toEqual(
        {
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          likes: 12
        })
  })

  test('favorite blog is 0 if list is empty', () => {
    expect(listHelper.favoriteBlog([]))
      .toBe(0)
  })
})

describe('total likes', () => {  
  test('total likes equals likes of one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('total likes equals the sum of likes of all blogs', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(36)
  })

  test('total likes is 0 if blog list is empty', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})