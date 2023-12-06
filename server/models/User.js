import mongoose from "mongoose";

const Userdb = new mongoose.Schema(
    {
        name:{
            type: String,
            required : true,
        },
        email:{
            type: String,
            required : true,
            unique: true,
        },
        password:{
            type: String,
            required : true,
            minLength: 10,
        },
        bookings:[{
            type : mongoose.Types.ObjectId,
            ref: "Bookings"
        }]
    }
);

export default mongoose.model("User",Userdb);