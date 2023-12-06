import mongoose from "mongoose";

const Moviesdb = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        actors:[{
            type: String,
            required: true,
        }],
        releaseDate: {
            type: Date,
            required: true,
            minLength: 10,
        },
        rating: {
            type: Number,
            required: true,
        },
        hours: {
            type: String,
            required : true,
        },
        posterURL: {
            type: String,
        },
        featured: {
            type: Boolean,
        },
        bookings: [{
            type: mongoose.Types.ObjectId,
            ref: "Bookings"
        }],
        admin: {
            type: mongoose.Types.ObjectId,
            ref: "Admin",
            required: true,
        }
    }
);

export default mongoose.model("Movies", Moviesdb);