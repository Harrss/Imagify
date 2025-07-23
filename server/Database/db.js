import mongoose from "mongoose";

const data=async()=>{
    try {
        await (mongoose.connect(process.env.MONGO_DB_URI));
        console.log("DATABASE CONNECTED");
        
        
    } catch (error) {
        console.log(error,"Error in database connection")
        
    }
}

export default data;