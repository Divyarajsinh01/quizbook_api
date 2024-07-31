const express = require('express')
const { addQuetion, getQuestions } = require('../controller/question.controller')

const questionRouter = express.Router()

questionRouter.post('/add/question', addQuetion)
questionRouter.post('/get/questions', getQuestions)

module.exports = questionRouter