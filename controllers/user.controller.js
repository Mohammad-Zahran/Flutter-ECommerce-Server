const User = require("../models/user.model.js");
const asyncHandler = require('express-async-handler');

const Register = asyncHandler(async (req, res) => {
    const {name, password} = req.body;
    if (!name || !password) {
        return res.status(400).json({success: false, message: "Name and password are required"});
    }

    try {
        const user = new User({name, password});
        const newUser = await user.save();
        res.json({success: true, message: "User created successfully."});
    }
    catch (error){
        res.status(500).json({success: false, message: error.message});
    }
})

module.exports = {
    Register,
}