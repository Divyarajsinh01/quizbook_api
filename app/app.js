const express = require('express')
const userRouter = require('../router/user.router')
const standardRouter = require('../router/standard.router')
const subjectRouter = require('../router/subject.router')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
require('../config/dbConnect')
const app = express()
const path = require('path')
const chapterRouter = require('../router/chapter.router')
const questionRouter = require('../router/question.router')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())

app.use('/user', userRouter)
app.use(standardRouter)
app.use(subjectRouter)
app.use(chapterRouter)
app.use(questionRouter)

app.use('/',express.static(path.join(__dirname, '../upload')))
app.get('/', async(req, res) => {
    res.status(200).send('welcome!')
})

module.exports = app