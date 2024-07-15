const Standard = require("../model/standard.model")

exports.addStadndard = async(req, res) => {
    try {
        const {standard} = req.body

        const stadardData = new Standard({
            standard
        })

        await stadardData.save()

        res.status(200).json({
            message: 'standard added successfully!',
            data: stadardData
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

