import mongoose from 'mongoose'

async function ConnectDatabase() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("database connect")
}

export default ConnectDatabase