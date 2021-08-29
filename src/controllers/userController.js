const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const signUp = async (req, res) => {
    try {
        if (await checkEmailInUse(req.body.email))
            return res.send({ message: "Email is already in use." });

        const hashedPassword = await bcrypt.hash(req.body.password, 8);

        const user = new userModel({
            ...req.body,
            password: hashedPassword
        });

        await user.save();

        res.status(201).send({ user, message: "Account Created. Please login" });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

const logIn = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user)
            return res.status(404).send({ message: "User not found" });

        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword)
            return res.status(403).send({ message: "Incorrect Password" });
        const token = generateAuthToken(user._id);
        res.status(200).send({ token: `Bearer ${token}` });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

const checkEmailInUse = async (email) => {
    const user = await userModel.findOne({ email });
    return user ? true : false;
}

const generateAuthToken = (userId) => {
    const token = jwt.sign({ _id: userId }, secretKey);
    return token;
}

module.exports = {
    signUp, logIn
}