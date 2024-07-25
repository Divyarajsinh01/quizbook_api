const Subject = require("../model/subject.model")
const path = require('path')
const fs = require('fs')

exports.addSubject = async (req, res) => {
    try {
        const { subject, std_id } = req.body
        const {subject_image } = req.files

        const uploadDir = path.join(__dirname, '../upload');
        const uploadPath = path.join(uploadDir, subject_image.name);

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir)
        }

        subject_image.mv(uploadPath, (err) => {
            if(err){
                throw err
            }
        })

        const standardData = new Subject({
            subject,
            subject_image: `http://localhost:3000/${subject_image.name}`,
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
                    subject_image: data.subject_image,
                    _id: data._id
                })
            } else {
                standard_vise_subject.push({
                    _id,
                    standard,
                    subject: [{
                        subject: data.subject,
                        subject_image: data.subject_image,
                        _id: data._id
                    }]
                })
            }
        }

        res.status(200).json({
            message: 'subject fetch successfully!',
            data: standard_vise_subject
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}