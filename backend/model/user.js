const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, "Please enter your name"],
        trim: true,
        maxLength: 50
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false
    }
});


module.exports = mongoose.model('user', userSchema);