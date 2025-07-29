const mongoose = require('mongoose')

try {
    async function dbConnect() {
        
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected To DB")
    }
    module.exports = dbConnect;
    
} catch (error) {
    console.log("Error Connecting DB"+error)
}

