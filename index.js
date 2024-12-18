// 1 
require('dotenv').config()

// 2
const express = require('express')

// 6 
const cors = require('cors')

const db = require('./DB/Connection')

const router = require('./Routes/router')
const ApplicationMiddlewares = require('./Middlewares/ApplicationMiddleware')
// 3 
const pfserver = express()

// 7 
pfserver.use(cors())
pfserver.use(express.json())
// pfserver.use(ApplicationMiddlewares)
pfserver.use(router)
//exports img from backend to frontend
pfserver.use('/uploads',express.static('./uploads'))

// 4 
const PORT = 3000 || process.env.PORT

// 5 
pfserver.listen(PORT,()=>{
    console.log("Pfserver running on the port "+PORT);
    
})
pfserver.get('/',(req,res)=>{
    res.send("Welcome to PF Server")
    
})