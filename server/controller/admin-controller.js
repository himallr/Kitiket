import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs'; //encrypted password
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let exitadmin;
    try {
        exitadmin = await Admin.findOne({ email });
    }
    catch (e) {
        console.log("User not found");
    }
    if (exitadmin) {
        return res.send(400).json({ message: "Admin already exists" });
    }

    let admin;
    const new_pass = bcrypt.hashSync(password); //to make password encrypted in the database(password is written into hash value)
    try {
        admin = new Admin({ name, email, password: new_pass });
        admin = await admin.save();
    }
    catch (e) {
        console.log("error");
    }
    if (!admin) {
        return res.send(500).json({ message: "Unable to store admin" });

    }
    return res.status(201).json({ admin });
}

export const getAdmin = async (req, res, next) => {
    let admin;
    try {
        admin = await Admin.find();

    } catch (e) {
        console.log("error");
    }
    if (!admin) {
        return res.send(500).json({ message: "Invalid admin" });
    }
    return res.status(201).json({ admin });
}

export const loginAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email && !password) {
        return res.status(422).json({ message: "Invalid data" });
    }
    const new_pass = bcrypt.hashSync(password);
    let existadmin;
    try {
        existadmin = await Admin.findOne({ email });
    }
    catch (e) {
        console.log("Admin not found");
    }

    if (existadmin) {

        const isPasswordCorrect = bcrypt.compareSync(password, existadmin.password);

        if (isPasswordCorrect) {

            //jwt.sign(payload, secretOrPrivateKey, [options, callback])
            const token = jwt.sign({ id: existadmin._id }, process.env.SECRET_KEY , {
                expiresIn: "7d",
            })

            //console.log(token);

            return res.status(200).json({ message: "Admin exists", token, id: existadmin._id });
        }
    }
}

export const getAdminById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    let admin;
    try {
        admin = await Admin.findById(id).populate("addedmovies");
    } catch (err) {
        return console.log(err);
    }
    //console.log(admin);
    if (!admin) {
        return console.log("Cannot find Admin");
    }
    return res.status(200).json({ admin });
};
