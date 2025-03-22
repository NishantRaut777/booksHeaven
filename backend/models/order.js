const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    Name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    items: [{
        bookId: {
            type: String
        },
        name: String,
        imgurl: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        },
        price: Number,
        originalPrice: Number,
    }],
    bill: {
        type: Number,
        required: true
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    date_added: {
        type: Date,
        default: Date.now
    }
},  {timestamps: true, versionKey: false});

const orderModel = mongoose.model("order", ordersSchema);

module.exports = orderModel;