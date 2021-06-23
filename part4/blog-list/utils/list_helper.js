const _ = require('lodash')

const dummy = () => {
  return 1
}

const likesSumReducer = (sum, blog) => {
  return sum + blog.likes
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce(likesSumReducer, 0)
}

const maxLikesReducer = (running_max_blog, next_blog) => {
  return running_max_blog.likes > next_blog.likes
    ? running_max_blog
    : next_blog
}

const favoriteBlog = (blogs) => {
  return blogs.length !== 0
    ? blogs.reduce(maxLikesReducer)
    : null
}

const mostBlogs = (blogs) => {
  return _
    .chain(blogs)
  // count the number of blogs by each author. returned object looks like
  // {author: count, ...}
    .countBy(blog => blog.author)
  // find the author with the largest number of blogs. initial value of
  // accumulator is {author: undefined, blogs: -1}. update the accumulator on
  // each iteration if the number of blogs is larger than the current value in
  // the accumulator
    .transform(
      (result, count, author) => {
        if (result.blogs < count) {
          result.blogs = count
          result.author = author
        }
      },
      {author: undefined, blogs: -1}
    )
    .value()
}

const mostLikes = (blogs) => {
  return _
    .chain(blogs)
  // group blogs by author
    .groupBy(blog => blog.author)
  // sum up the likes that the blog posts each other has
    .mapValues((blogs) => _.sumBy(blogs, blog => blog.likes))
  // find the author with the largest number of likes. initial value of
  // accumulator is {author: undefined, likes: -1}. update the accumulator on
  // each iteration if the number of likes is larger than the current value in
  // the accumulator
    .transform(
      (result, likes, author) => {
        if (result.likes < likes) {
          result.likes = likes
          result.author = author
        }
      },
      {author: undefined, likes: -1}
    )
    .value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
