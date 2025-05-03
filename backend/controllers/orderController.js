const Order = require("../models/order");
const Cart = require("../models/cart");

const checkoutOrder = async(req,res) => {
    try {
        const userId = req.user.id;
        const { Name, phoneNumber, address } = req.body;
        // console.log(userId);
        const cartData = await Cart.findOne({ userId });
        // console.log(cartData);

        // proceed only if there is cart available for current user.
        if(!cartData){
            res.status(404).send("There is no cart for current user");
        }
        const cartItems = cartData.items;
        const cartBill = cartData.bill;
        const orderData = {
            userId: userId,
            Name: Name,
            address: address,
            items: cartItems,
            bill: cartBill,
            phoneNumber: phoneNumber,
        };

        const resInsert = await Order.create(orderData);
        if(resInsert){
            const result = await Cart.deleteOne({ userId });
            const finalData = { success: true, ...result }
            res.status(200).send({finalData: finalData, message: "Thank you for ordering. Happy Reading 😊"});
        } else{
            res.status(404).send("Something went wrong during checkout");
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Checkout Order Controller ERROR ${error}`,
            success: false
        })
    };
};

const getOrders = async(req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ userId: userId });

        return res.status(200).send({
            orders
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Get Orders Controller ERROR ${error}`,
            success: false
        })
    }
}

module.exports = { checkoutOrder, getOrders };