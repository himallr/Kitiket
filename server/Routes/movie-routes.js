//CRUD operations for admin to add movies

import express from "express";
import { addMovie, deleteMovie, getMovies, getSingleMovie } from "../controller/movie-controller.js";

const movieRouter = express.Router();

//userRouter.post("/addmovies", getAllUsers); //localhost:3001/user/allusers (from index.js)
movieRouter.post("/", addMovie);
movieRouter.get("/",getMovies);
movieRouter.get("/:id",getSingleMovie);
movieRouter.delete("/:id",deleteMovie);
export default movieRouter;