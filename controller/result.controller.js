const Result = require("../model/result.model")
const Subject = require("../model/subject.model")


exports.addResults = async (req, res) => {
    try {
        const { std_id, sub_id, chapter_id, questions } = req.body;
        const user_id = req.user._id;

        const result = new Result({
            user_id,
            std_id,
            sub_id,
            chapter_id,
            questions
        });

        await result.save();

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
            { $unwind: '$standard' },
            {
                $lookup: {
                    from: 'subjects',
                    localField: 'sub_id',
                    foreignField: '_id',
                    as: 'subject'
                }
            },
            { $unwind: '$subject' },
            {
                $lookup: {
                    from: 'chapters',
                    localField: 'chapter_id',
                    foreignField: '_id',
                    as: 'chapter'
                }
            },
            { $unwind: '$chapter' },
            {
                $lookup: {
                    from: 'questions',
                    localField: 'questions.question_id',
                    foreignField: '_id',
                    as: 'questionDetails'
                }
            },
            {
                $project: {
                    std_id: 1,
                    standard: '$standard.standard',
                    sub_id: 1,
                    subject: '$subject.subject',
                    chapter_id: 1,
                    chapter_name: '$chapter.chapter_name',
                    chapter_number: '$chapter.chapter_number',
                    teacher_name: '$chapter.teacher_name',
                    questions: {
                        $map: {
                            input: '$questions',
                            as: 'q',
                            in: {
                                question_id: '$$q.question_id',
                                user_answer: '$$q.user_answer',
                                question_detail: {
                                    $arrayElemAt: [
                                        '$questionDetails',
                                        { $indexOfArray: ['$questionDetails._id', '$$q.question_id'] }
                                    ]
                                }
                            }
                        }
                    }
                }
            }, {
                $project: {
                    std_id: 1,
                    standard: 1,
                    sub_id: 1,
                    subject: 1,
                    chapter_id: 1,
                    chapter_name: 1,
                    chapter_number: 1,
                    teacher_name: 1,
                    questions: {
                        $map: {
                            input: '$questions',
                            as: 'q',
                            in: {
                                question_id: '$$q.question_id',
                                user_answer: '$$q.user_answer',
                                question_number: '$$q.question_detail.question_number',
                                question_name: '$$q.question_detail.question',
                                option: '$$q.question_detail.option',
                                right_answer: '$$q.question_detail.right_answer'
                            }
                        }
                    }
                }
            }

        ]);

        res.status(200).json({
            message: 'Result added successfully!',
            data: resultData
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
