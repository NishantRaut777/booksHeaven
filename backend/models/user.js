const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profileImg: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    verificationToken: {
        type: String
    }
}, {timestamps: true, versionKey: false});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;