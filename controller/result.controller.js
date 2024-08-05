const Result = require("../model/result.model")
const Subject = require("../model/subject.model")


exports.addResults = async (req, res) => {
    try {
        const { std_id, sub_id, chapter_id, questions } = req.body
        const user_id = req.user._id

        const result = new Result({
            user_id,
            std_id,
            sub_id,
            chapter_id,
            questions
        })

        await result.save()

        // const resultData = await Result.findOne({user_id}).populate('std_id')

        const resultData = await Result.aggregate([
            { $match: { _id: result._id } },
            {
                $lookup: {
                    from: 'standards',
                    localField: 'std_id',
                    foreignField: '_id',
                    as: 'standard'
                }
            },
            // {$unwind: '$standard'},
            {
                $lookup: {
                    from: 'subjects',
                    localField: 'sub_id',
                    foreignField: '_id',
                    as: 'subject'
                }
            },
            // {$unwind: '$subject'},
            {
                $lookup: {
                    from: 'chapters',
                    localField: 'chapter_id',
                    foreignField: '_id',
                    as: 'chapter'
                }
            },
            // {$unwind: '$chapter'},
            {
                $lookup: {
                    from: 'questions',
                    localField: 'questions.question_id',
                    foreignField: '_id',
                    as: 'questiondeatils'
                }
            },
            // {$unwind: '$questiondeatils'},
        ])

        res.status(200).json({
            message: 'result added successfully!',
            data: resultData
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}