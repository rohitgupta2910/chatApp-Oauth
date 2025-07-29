const mongoose = require('mongoose')

async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected To DB")
    } catch (error) {
        console.log("Error Connecting DB: " + error)
        process.exit(1)
    }
}

module.exports = dbConnect

