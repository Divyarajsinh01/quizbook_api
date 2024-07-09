const mongoose = require('mongoose')

const URL = 'mongodb+srv://Divyarajsinh:VUwkXMsrFXnlCCbH@cluster0.du1aj35.mongodb.net/quizbook?retryWrites=true&w=majority&appName=Cluster0'

const dbConnect = async () => {
    try {
        await mongoose.connect(URL)
        console.log('database connection successfully!');
    } catch (error) {
        console.log(`database connection failed: ${error}`);
    }
}

dbConnect()

module.exports = dbConnect