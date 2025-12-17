import mongoose from 'mongoose';


function connectToDatabase() {
    mongoose.connect("mongodb://localhost:27017/AppleMusicDB", )
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
    
}

export default connectToDatabase;