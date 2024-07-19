const User = require("../model/user.model")
const genarateToken = require("../utils/generateAuthToken")
const path = require('path')
const fs = require('fs')

exports.signUpUser = async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber, gender, DOB, profession } = req.body

        const {userProfile} = req.files

        const uploadDir = path.join(__dirname, '../upload');
        const uploadPath = path.join(uploadDir, userProfile.name);

        if(!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir)
        }

        userProfile.mv(uploadPath, (err) => {
            if(err){
                throw err
            }
        })

        // console.log(userProfile);

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
            profession,
            userProfile: `http://localhost:3000/${userProfile.name}`
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
        const userID = req.user._id

        const user = await User.findOne({_id: userID})

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

        const token = await genarateToken(user._id)

        res.status(200).json({
            message: 'User Login Successfully!',
            data: user,
            token
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong!",
            error: error.message
        })
    }
}


// exports.addUser = async (req, res) => {
//     try {
//         const {name, age} = req.body
//         const {img} = req.files
//         const uploadDir = path.join(__dirname, '../upload');
//         const uploadPath = path.join(uploadDir, img.name);

//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }

//         img.mv(uploadPath, (err) => {
//             if(err){
//                 throw err
//             }
//         })

//         res.status(200).json({
//             message: 'success',
//             data: {name, age , img: `http://localhost:3000/${img.name}`}
//         })
//     } catch (error) {
//         res.status(400).json({
//             error: error.message
//         })
//     }
// }