const http = require('http')
const app = require('./app/app')
require('dotenv').config()

const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log(`server is running on http://localhost:${port}`);
    }
})