const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    imgurl: {
        type: String,
        required: [true, "ImageURL is required"]
    },
    author: {
        type: [String],
        required: [true, "Author is required"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"]
    },
    isOffer: {
        type: Boolean,
        required: [true, "IsOffer is required"]
    },
    originalPrice: {
        type: Number,
        required: [true, "Original price is required"]
    },
    discountedPrice: {
        type: Number,
    },
    discountPercent: {
        type: Number,
    },
    leftInStock: {
        type: Number,
        required: [true, "Left in stock is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    language: {
        type: String,
        required: [true, "Language is required"]
    },
    publisher: {
        type: String,
        required: [true, "Publisher is required"]
    },
    edition: {
        type: String,
        default: "",
    },
    condition: {
        type: String
    },
    categories: {
        type: [String],
        required: [true, "At least 1 category is required"]
    }

}, {timestamps: true, versionKey: false});

const bookModel = mongoose.model("books2", bookSchema);

module.exports = bookModel;