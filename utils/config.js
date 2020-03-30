require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let VALIDATION = process.env.VALIDATION

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TEST_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
  VALIDATION
}