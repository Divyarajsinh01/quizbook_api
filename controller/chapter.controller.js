const Chapter = require("../model/chapter.model")

exports.addChapter = async (req, res) => {
    try {
        const {chapter_number, chapter, teacher_name,total_questions,minutes,sub_id} = req.body

        const chapter_index = await Chapter.findOne({sub_id}).sort({chapter_number: -1})

        console.log(chapter_index);

        const increment_chapter_number = chapter_index ? chapter_index.chapter_number + 1 : 1
        // console.log(increment_chapter_number);

        const chpaterData = new Chapter({
            chapter_number: increment_chapter_number,
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