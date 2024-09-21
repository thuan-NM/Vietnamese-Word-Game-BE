const mongoose = require("mongoose");
const db={}
const connectDb = async () => {
    try {
        console.log("Connecting to the database...")
        await mongoose.connect(process.env.DATABASE_CONNECTION);
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.error("Connection error:", error);
    }
};

module.exports = { connectDb,db };
