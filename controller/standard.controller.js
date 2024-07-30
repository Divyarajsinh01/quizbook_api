const Standard = require("../model/standard.model")

exports.addStadndard = async (req, res) => {
    try {
        const { standard } = req.body

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


exports.getStandard = async (req, res) => {
    try {
        const standard = await Standard.find()

        res.status(200).json({
            message: 'standard fetch successfully!',
            data: standard
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}


exports.updateStandard = async (req, res) => {
    try {
        const { id, standard } = req.body

        const updatedData = await Standard.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    standard
                }
            },{
                new: true
            })

        res.status(200).json({
            message: 'standard updated successfully!',
            data: updatedData
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}