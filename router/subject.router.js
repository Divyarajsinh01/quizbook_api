const express = require('express')
const { addSubject, getSubject } = require('../controller/subject.controller')


const subjectRouter = express.Router()

subjectRouter.post('/add/subject', addSubject)
subjectRouter.get('/get/subject', getSubject)

module.exports = subjectRouter