//CRUD operations for admin

import express from "express";
import { getAdmin, getAdminById, loginAdmin, signup } from "../controller/admin-controller.js";

const adminRouter = express.Router();

//userRouter.post("/addmovies", getAllUsers); //localhost:3001/user/allusers (from index.js)
adminRouter.post("/signup", signup);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/get",getAdmin);
adminRouter.get("/:id",getAdminById);

export default adminRouter;