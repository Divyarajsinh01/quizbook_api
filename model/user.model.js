const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    mobileNumber: {
        type: String,
        trim: true,
        required: true,
        validate: (value) => {
            if (!validator.isMobilePhone(value, ['en-IN'])) {
                throw new Error('Please provide valid Mobile Number!')
            }
            return value
        }
    },
    email: {
        type: String,
        trim: true,
        required: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email Address!')
            }
            return value
        }
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        trim: true,
        true: true
    },
    profession: {
        type: String,
        enum: ['Admin', 'Teacher', 'Student'],
        trim: true,
        required: true
    },
    DOB: {
        type: String,
        trim: true,
        validate: (value) => {
            if (!validator.isDate(value, { format: 'DD/MM/YYYY', strictMode: true })) {
                throw new Error('Please Provide Date in DD/MM/YYYY formate!')
            }
            return value
        }
    },
    // userProfile: {
    //     type: String
    // },
    tokens: [{
        token: {
            type: String
        }
    }]
})

// userSchema.methods.generateAuthToken = async function () {
//     const user = this;
//     const token = jwt.sign({ _id: user._id.toString() }, 'secretkey'); // Use a strong secret key in production
//     user.tokens = user.tokens.concat({ token });
//     await user.save();
//     return token;
// };

const User = mongoose.model('User', userSchema)


module.exports = User