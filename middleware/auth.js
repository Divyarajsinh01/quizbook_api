const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", '')
        console.log(token);
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth