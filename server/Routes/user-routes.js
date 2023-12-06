//CRUD operations for user

import express from "express";
import { deleteUser, getAllUsers, signup, updateuser,loginUser, getBooking, getUserbyId } from "../controller/user-controller.js";

const userRouter = express.Router();

userRouter.get("/get", getAllUsers); //localhost:3001/user/allusers (from index.js)
userRouter.post("/signup", signup);
userRouter.put("/:id",updateuser);
userRouter.get("/:id",getUserbyId);
userRouter.delete("/:id",deleteUser);
userRouter.post("/login",loginUser);
userRouter.get("/getbookings/:id",getBooking);//not working

export default userRouter;