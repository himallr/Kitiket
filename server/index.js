import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user-routes.js";
import adminRouter from "./Routes/admin-routes.js";
import movieRouter from "./Routes/movie-routes.js";
import bookingRouter from "./Routes/bookings-routes.js";
import cors from "cors";
import path from "path";
const app = express();
dotenv.config();
app.use(cors({
    origin: ["https://kitiket-frontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());

app.use("/user", userRouter)
app.use("/admin", adminRouter)
app.use("/movie", movieRouter)
app.use("/booking", bookingRouter);

// const _dirname = path.resolve();
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(_dirname,'movie_booking/build')))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(_dirname,'movie_booking','build','index.html'))
//     })
// }
// else{
//     app.get("/" , (req,res)=>{
//         res.send("API is running.");
//     })
// }


//(req,res,next)->callback function
mongoose
    .connect('mongodb+srv://himallr:0IBV3VHnNSE12T5v@cluster0.kb0j2oy.mongodb.net/test?retryWrites=true&w=majority')
    .then(() =>
        app.listen(3001, () => console.log("Listening to port 3001"))
    )
    .catch((e) => console.log(e));

//himallr
//0IBV3VHnNSE12T5v
