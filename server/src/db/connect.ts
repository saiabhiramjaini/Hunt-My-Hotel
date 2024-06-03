import mongoose from "mongoose";

const connectDB = 
mongoose.connect(process.env.MONGO_URL!)
.then(()=>{
    console.log("DB connected");
})
.catch((e)=>{
    console.log(e);
});

export default connectDB;