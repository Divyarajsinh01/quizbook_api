const express = require('express')
const { addChapter } = require('../controller/chapter.controller')

const chapterRouter = express.Router()

chapterRouter.post('/add/chapter', addChapter)


module.exports = chapterRouter