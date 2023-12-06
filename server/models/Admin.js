import mongoose from "mongoose";

const Admindb = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        addedmovies: [
            {
                type: mongoose.Types.ObjectId,
                ref : "Movies",
            }
        ]
    }
);

export default mongoose.model("Admin", Admindb);