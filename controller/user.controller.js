const User = require("../model/user.model")

exports.signUpUser = async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber, gender, DOB, profession } = req.body

        const isUSer = await User.findOne({ email })

        if (isUSer) {
            throw new Error('you are already register!')
        }

        const user = new User({
            firstName,
            lastName,
            email,
            mobileNumber,
            gender,
            DOB,
            profession
        })

        await user.save()
        // console.log(user);
        res.status(200).json({
            message: 'successfully signup!',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const userID = req.params.id
        const user = await User.findById({ _id: userID })

        res.status(200).json({
            message: 'successfully profile fetch!',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const allUser = await User.find()
        if (!allUser.length) {
            throw new Error('no user available!')
        }

        res.status(200).json({
            userData: allUser
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { mobileNumber } = req.body

        const user = await User.findOne({ mobileNumber })

        if(!user){
            throw new Error('You are not register yet, please signup again!')
        }

        res.status(200).json({
            message: 'User Login Successfully!',
            data: user
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}