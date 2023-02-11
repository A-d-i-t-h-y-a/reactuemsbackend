const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const URI = `${process.env.URI}`


const connectToMongo = ()=>{
    mongoose.connect(URI, ()=>{
        console.log("connected to mongo successfully");
    })
}

module.exports = connectToMongo;