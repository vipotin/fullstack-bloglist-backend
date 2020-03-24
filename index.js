// 4.1 bloglist
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const Blog = require('./models/blog')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})