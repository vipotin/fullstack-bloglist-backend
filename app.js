// 4.1 bloglist
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
//const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

mongoose.set('useFindAndModify', false)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app