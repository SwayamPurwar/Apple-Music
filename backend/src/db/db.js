import mongoose from 'mongoose';
import config from "../config/config.js";
import dotenv from "dotenv";
dotenv.config();

function connectToDatabase() {
     mongoose
    .connect(config.MONGODB_URL)    
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
    
}

export default connectToDatabase;