const { model } = require("mongoose")
const { path } = require("../app/app")
const Question = require("../model/question.model")


exports.addQuetion = async (req, res) => {
    try {
        const { question, option, right_answer, chapter_id } = req.body

        const question_index = await Question.findOne({ chapter_id }).sort({ question_number: -1 })

        const question_auto_number = question_index ? question_index.question_number + 1 : 1


        const questions = new Question({
            question_number: question_auto_number,
            question,
            option,
            right_answer,
            chapter_id
        })

        await questions.save()

        res.status(200).json({
            message: 'question added successfully!',
            data: questions
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


exports.getQuestions = async (req, res) => {
    try {
        const { chapter_id } = req.body
        const questions = await Question.find({ chapter_id })
            // .populate({
            //     path: 'chapter_id',
            //     populate: {
            //         path: 'sub_id',
            //         model: 'subject',
            //         populate: {
            //             path: 'std_id',
            //             model: 'Standard'
            //         }
            //     }
            // })

        res.status(200).json({
            message: 'question fetch successfully!',
            data: questions
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}