const Chapter = require("../model/chapter.model")

exports.addChapter = async (req, res) => {
    try {
        const {chapter_number, chapter, teacher_name,total_questions,minutes,sub_id} = req.body

        const chpaterData = new Chapter({
            chapter_number,
            chapter,
            teacher_name,
            total_questions,
            minutes,
            sub_id
        })

        await chpaterData.save()

        res.status(200).json({
            message: 'successfully chapter added!',
            data: chpaterData
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}