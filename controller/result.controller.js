const Result = require("../model/result.model")


exports.addResults = async(req, res) => {
    try {
        const {std_id,sub_id,chapter_id,questions} = req.body
        const user_id = req.user._id

        const result = new Result({
            user_id,
            std_id,
            sub_id,
            chapter_id,
            questions
        })

        await result.save()

        res.status(200).json({
            message: 'result added successfully!',
            data: result
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}