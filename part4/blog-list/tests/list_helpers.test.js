const listHelper = require('../utils/list_helper.js')
const blogTestData = require('./blog_test_data')

test('dummy returns one', () => {
  const blogs = []

  expect(listHelper.dummy(blogs)).toBe(1)
})

describe('total likes', () => {
  test('is 0 when no blogs are passed', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('is correct when one blog is passed', () => {
    const blogs = [blogTestData[0]]
    const likes = blogs[0].likes

    expect(listHelper.totalLikes(blogs)).toBe(likes)
  })

  test('is correct when multiple blogs are passed', () => {
    const blogs = blogTestData
    // was manually calculated
    const sum = 36

    expect(listHelper.totalLikes(blogs)).toBe(sum)
  })
})

describe('favorite blog', () => {
  test('is null if no blogs passed', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  test('is correct when one blog is passed', () => {
    const blog = blogTestData[0]
    const blogs = [blog]

    expect(listHelper.favoriteBlog(blogs)).toEqual(blog)
  })

  test('is correct when multiple blogs are passed', () => {
    const blogs = blogTestData
    // was manually calculated
    const maxBlog = blogTestData[2]

    expect(listHelper.favoriteBlog(blogs)).toEqual(maxBlog)
  })
})

describe('author with most blogs', () => {
  test('is correct when one blog is passed', () => {
    const blogs = [blogTestData[0]]

    expect(listHelper.mostBlogs(blogs)).toEqual({author: 'Michael Chan', blogs: 1})
  })

  test('is correct when multiple blogs are passed', () => {
    const blogs = blogTestData

    expect(listHelper.mostBlogs(blogs)).toEqual({author: 'Robert C. Martin', blogs: 3})
  })
})

describe('author with most likes', () => {
  test('is correct when one blog is passed', () => {
    const blogs = [blogTestData[0]]

    expect(listHelper.mostLikes(blogs)).toEqual({author: 'Michael Chan', likes: 7})
  })

  test('is correct when multiple blogs is passed', () => {
    const blogs = blogTestData

    expect(listHelper.mostLikes(blogs)).toEqual({author: "Edsger W. Dijkstra", likes: 17})
  })
})
