const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Author name is required"]
    },
    birthdate: {
        type: String,
        required: [true, "Birthdate is required"]
    },
    books: {
        type: [String],
        required: [true, "At least 1 book is required"]
    },
    summary: {
        type: String,
        required: [true, "Author summary is required"]
    },
    imgsrc: {
        type: String,
        required: [true, "Author image is required"]
    }

}, {timestamps: true, versionKey: false});

const authorModel = mongoose.model("author", authorSchema);

module.exports = authorModel;