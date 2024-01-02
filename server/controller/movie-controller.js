import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Movies from '../models/Movies.js';

export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1]; //Bearer token
    if (!extractedToken) {
        return res.status(404).json({ message: "Token Not found" });
    }

    let adminId;

    //verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json("{ message: `${err.message}` }");
        }
        else {
            adminId = decrypted.id;
            return;
        }
    });

    //create new movie
    const { title, description, actors, releaseDate, rating, hours, posterURL, featured } = req.body;
    if (!title && !description && !rating && !posterURL && !featured && !hours) {
        return res.status(404).json({ message: "Invalid datas" });
    }

    let movie;
    try {
        movie = new Movies({ title, description, actors, releaseDate: new Date(`${releaseDate}`), rating, hours, posterURL, featured, admin: adminId });

        //movie = await movie.save();
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();

        await movie.save({ session });
        adminUser.addedmovies.push(movie);
        await adminUser.save({ session });
        await session.commitTransaction();

    }
    catch (e) {
        console.log(e);
    }

    if (!movie) {
        // return res.status(404).json({message:"Request Failed"});
        console.log(movie);
    }

    return res.status(200).json({ movie });
}

export const getMovies = async (req, res, next) => {
    let movies;
    try {
        movies = await Movies.find();
        // movies = movies.save();

    } catch (e) {
        console.log(e);
    }

    if (!movies) {
        return res.status(500).json({ message: "Request failed" });
    }
    return res.status(200).json({ movies });
}

export const getSingleMovie = async (req, res, next) => {
    const id = req.params.id;
    let movies;
    try {
        movies = await Movies.findById(id);
        console.log(id);
    }
    catch (e) {
        console.log("error");
    }
    if (!movies) {
        return res.status(500).json({ message: "Invalid Movie" });
    }
    return res.status(200).json({ movies });
}

export const deleteMovie = async (req, res, next) => {
    const id = req.params.id;
    let movie;
    try {
        movie = await Movies.findByIdAndRemove(id);

    } catch (e) {
        console.log("error");
    }
    if (!movie) {
        return res.send(500).json({ message: "Invalid User" });
    }
    return res.status(200).json({ message: "Movie Deleted" });
}
