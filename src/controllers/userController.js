const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

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
        res.status(400).send({ message: e.message });
    }
}

const checkEmailInUse = async (email) => {
    const user = await userModel.findOne({ email });
    return user ? true : false;
}

module.exports = {
    signUp
}