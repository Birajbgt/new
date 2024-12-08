
const mongoose = require('mongoose')


const connectDatabase = () => {
    try {
        mongoose.connect(process.env.MONGODB_CLOUD).then(() => {
            console.log("Database connected!")
        })
    }
    catch {
        console.log("Database not connected")
    }
}

//Exporting the function

module.exports = connectDatabase 