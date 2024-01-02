import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Movies from "../models/Movies.js";
import User from "../models/User.js";

export const createBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;

    let existmovie;
    let existuser;

    try {
        existmovie = await Movies.findById(movie);
        existuser = await User.findById(user);
    }
    catch (e) {
        console.log("error");
    }

    if (!existmovie) {
        return res.status(400).json({ message: "Movie not found" });
    }
    if (!existuser) {
        return res.status(404).json({ message: "Not user found" })
    }
    let newbooking;
    try {
        newbooking = new Bookings({ movie, date: new Date(`${date}`), seatNumber, user });

        const session = await mongoose.startSession();
        session.startTransaction();
        existmovie.bookings.push(newbooking);
        existuser.bookings.push(newbooking);
        await existuser.save({ session });
        await existmovie.save({ session });
        await newbooking.save({ session });
        session.commitTransaction();

        // newbooking = await newbooking.save();
    } catch (e) {
        console.log(e);
    }
    if (!newbooking) {
        return res.status(400).json({ message: "unable to create" });
    }
    return res.status(200).json({ newbooking });
}

export const getBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {

        booking = await Bookings.findById(id);
    }
    catch (e) {
        console.log(e);
    }

    if (!booking) {
        return res.status(500).json({ message: "No Bookings found" });
    }
    return res.status(200).json({ booking });
}

export const getAllBookings = async (req, res, next) => {
    let bookings;
    try {
        bookings = await Bookings.find().populate("user movie");
        bookings = bookings.save();

    } catch (e) {
        console.log(e);
    }

    if (!bookings) {
        return res.status(500).json({ message: "Request failed" });
    }
    return res.status(200).json({ bookings });
}

export const deleteBookings = async (req, res, next) => {
    const id = req.params.id;
    let booking;

    try {
        booking = await Bookings.findByIdAndRemove(id).populate("user movie");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking);
        await booking.movie.save({ session });
        await booking.user.save({ session });
        session.commitTransaction();
    }
    catch (e) {
        console.log(e);
    }
    if (!booking) {
        return res.status(500).json({ message: "Unable to Delete" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
}
