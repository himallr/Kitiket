import mongoose from "mongoose";

const Bookingsdb = new mongoose.Schema(
    {
        movie:{
            type: mongoose.Types.ObjectId,
            ref: "Movies",
            required : true,
        },
        date:{
            type: Date,
            required : true,
        },
        seatNumber:{
            type: Number,
            required : true,
        },
        user:{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        }
    }
);

export default mongoose.model("Bookings",Bookingsdb);