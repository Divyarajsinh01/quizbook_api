const Subject = require("../model/subject.model")

exports.addSubject = async (req, res) => {
    try {
        const { subject, std_id } = req.body

        const standardData = new Subject({
            subject,
            std_id
        })

        await standardData.save()

        res.status(200).json({
            message: 'subject added successfully!',
            data: standardData
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

exports.getSubject = async (req, res) => {
    try {
        const subject = await Subject.find().populate('std_id')

        const standard_vise_subject = []

        for (const data of subject) {
            const _id = data.std_id._id
            const standard = data.std_id.standard
            const subject = []

            const _isStandard = standard_vise_subject.find((std) => std._id === _id)

            if (_isStandard) {
                _isStandard.subject.push({
                    subject: data.subject,
                    _id: data._id
                })
            } else {
                standard_vise_subject.push({
                    _id,
                    standard,
                    subject: [{
                        subject: data.subject,
                        _id: data._id
                    }]
                })
            }
        }

        res.status(200).json({
            message: 'subject fetch successfully!',
            data: standard_vise_subject
        })

        /*
        [
            standard: [
                _id
                standard: name,
                subject: [
                    subject: name,
                    _id: 
                ]
            ]
        ]
        */

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}