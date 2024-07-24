const Chapter = require("../model/chapter.model")

exports.addChapter = async (req, res) => {
    try {
        const { chapter, teacher_name,total_questions,minutes,sub_id} = req.body

        //find last chapter based on chapter number with subject
        const chapter_index = await Chapter.findOne({sub_id}).sort({chapter_number: -1})

        // console.log(chapter_index);

        //auto-increment chapter number based on last chapter number store in database 
        const increment_chapter_number = chapter_index ? chapter_index.chapter_number + 1 : 1
        // console.log(increment_chapter_number);

        const chapterData = new Chapter({
            chapter_number: increment_chapter_number,
            chapter,
            teacher_name,
            total_questions,
            minutes,
            sub_id
        })

        await chapterData.save()

        res.status(200).json({
            message: 'successfully chapter added!',
            data: chapterData
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


exports.getChapters = async (req, res) => {
    try {
        const chapter = await Chapter.find().populate({
            path: 'sub_id',
            modal: 'subject',
            populate: {
              path: 'std_id',
              model: 'Standard'
            }
          })

        res.status(400).json({
            message: 'chapter fetch successfully!',
            data: chapter
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}