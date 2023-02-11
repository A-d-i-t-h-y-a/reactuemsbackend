const mongoose = require('mongoose')
const {Schema} = mongoose

const eventSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required: true,
        unique: true
    },
    description:{
        type:String,
        required: true
    },
    etype:{
        type:String,
        required: true
    },
    edate:{
        type: String,
        required: true
    },
    etime:{
        type: String,
        required: true
    },
    venue:{
        type:String,
        required: true
    },
    food:{
        type:String,
        required: true
    },
    quantity:{
        type:String,
        required: true
    },
    mdescription:{
        type:String,
        required: true
    },
    status:{
        type:String,
        default: "pending"
    }
})

const Events = mongoose.model('Schedules', eventSchema)
Events.createIndexes()
module.exports = Events