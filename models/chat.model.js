const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    senderId:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user",
        required : true ,
    },
    receiverId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true ,
    },
    message:{
        type : String ,
        required : true ,
    },
    timestamp:{
        type : Date,
        default : Date.now ,
    },
})

const Chat = mongoose.model("chat",chatSchema)
module.exports = Chat ;