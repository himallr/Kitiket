import Bookings from '../models/Bookings.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs'; //encrypted password

export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }
    catch (e) {
        return next(e);
    }
    if (!users) {
        return res.status(500).json({ message: "Error occured" });
    }
    return res.status(200).json({ users });

}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
        return res.status(422).json({ message: "Invalid data" });
    }

    const new_pass = bcrypt.hashSync(password); //to make password encrypted in the database(password is written into hash value)
    let newuser;
    try {
        newuser = new User({ name, email, password: new_pass });
        newuser = await newuser.save();
    }
    catch (e) {
        return console.log(e);
    }
    if (!newuser) {
        return res.send(500).json({ message: "Invalid" });
    }
    return res.status(200).json({ id: newuser._id })
}

export const updateuser = async (req, res, next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    if (!name && name.trim() === "" && !email && email.trim() === "" && !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid data" });
    }
    const new_pass = bcrypt.hashSync(password);
    let user;
    try {
        user = await User.findByIdAndUpdate(id, { name, email, password: new_pass });
    }
    catch (e) {
        console.log("error");
    }
    if (!user) {
        return res.send(500).json({ message: "Invalid" });
    }
    return res.status(201).json({ message: "Updated" });
}

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndRemove(id);

    } catch (e) {
        console.log("error");
    }
    if (!user) {
        return res.send(500).json({ message: "Invalid User" });
    }
    return res.status(201).json({ message: "Deleted" });
}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(422).json({ message: "Invalid data" });
    }
    const new_pass = bcrypt.hashSync(password);
    let user;
    try {
        user = await User.findOne({ email });
    }
    catch (e) {
        console.log("User not found");
    }

    if (!user) {
        return res.sendStatus(400).json({ message: "Unable to find user" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    // if (!isPasswordCorrect) {
    //     return res.send(400).json({ message: "Invalid Password" });
    // }
    if (isPasswordCorrect)
        return res.status(200).json({ message: "Successfull", id: user._id });
}

export const getUserbyId = async (req, res, next) => {
    const id = req.params.id;
    let users;
    try {
        users = await User.findById(id);
    }
    catch (e) {
        return next(e);
    }
    if (!users) {
        return res.status(500).json({ message: "Error occured" });
    }
    return res.status(200).json({ users });

}

export const getBooking = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    let bookings;
    try {
        bookings = await Bookings.find({ user: id });
    }
    catch (e) {
        console.log("error");
    }
    if (!bookings) {
        res.status(500).json({ message: "No bookings" });
    }
    return res.status(200).json({ bookings });
}


