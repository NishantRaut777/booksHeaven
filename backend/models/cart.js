const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    items: [{
        bookId: {
            type: String,
        },
        name: String,
        imgurl: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: Number,
        originalPrice: Number,
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps: true, versionKey: false});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;