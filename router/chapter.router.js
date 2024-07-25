const express = require('express')
const { addChapter, getChapters } = require('../controller/chapter.controller')

const chapterRouter = express.Router()

chapterRouter.post('/add/chapter', addChapter)
chapterRouter.post('/get/chapter', getChapters)

module.exports = chapterRouter