const cartModel = require("../models/cart");
const bookModel = require("../models/book");


const getCartItems = async(req, res) => {
    const userId = req.user.id;
    try {
        let cart = await cartModel.findOne({userId});
        if(cart && cart.items.length > 0){
            res.send(cart);
        } else {
            res.send(null);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Get Cart Item Controller ERROR ${error}`,
            success: false
        })
    }
};


const addCartItem = async(req, res) => {
    const userId = req.user.id;
    const { bookId, quantity } = req.body;

    try {
        let cart = await cartModel.findOne({userId});
        let item = await bookModel.findOne({_id: bookId});

        if(!item){
            return res.status(404).json({ message : "Item not found"});
        }

        const originalPrice = item.originalPrice;
        const price = item.discountedPrice;
        const name = item.name;
        const imgurl = item.imgurl;

        if(cart){
            // check if product already exist in the cart 
            let itemIndex = cart.items.findIndex(p => p.bookId === bookId);

            if(itemIndex > -1){
                // let bookItem = cart.items[itemIndex];
                // bookItem.quantity += quantity;
                // cart.items[itemIndex] = bookItem;
                return res.status(200).json({cart: cart, message: "Item already exist" });
            } else {
                cart.items.push({  bookId, name, imgurl, quantity, price, originalPrice });
            }

            cart.bill += quantity * price;
            cart = await cart.save();
            return res.status(200).json({ cart: cart, message: "Item added successfully" });
        } else {
            // if no cart exists for given user create new one
            const newCart = await cartModel.create({
                userId,
                items: [{ bookId, name, imgurl, quantity, originalPrice, price }],
                bill: quantity * price
            });
            return res.status(201).json({ cart: newCart, message: "Item added" });

        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Add Cart Item Controller ERROR ${error}`,
            success: false
        })
    }
};

// increments, decrements products quantity  by 1 and updates price
const addCartItemINCRDECR = async(req, res) => {
    const userId = req.user.id;
    const { bookId, type } = req.body;

    try {
        let cart = await cartModel.findOne({userId});
        let item = await bookModel.findOne({_id: bookId});

        if(!item){
            res.status(404).send("Item not found");
        }

        const originalPrice = item.originalPrice;
        const price = item.discountedPrice;
        const name = item.name;
        const imgurl = item.imgurl;

        if(cart){
            // check if product already exist in the cart 
            let itemIndex = cart.items.findIndex(p => p.bookId === bookId);
            let quantity

            if(itemIndex > -1){
                let bookItem = cart.items[itemIndex];
                if (type == "INCR"){
                    // Incrementing quantity by 1
                    bookItem.quantity += 1;
                    quantity = bookItem.quantity
                    cart.bill += price;
                } else if (type == "DECR"){
                    if (bookItem.quantity > 1){
                        // Decrementing quantity by 1
                        bookItem.quantity -= 1;
                        quantity = bookItem.quantity
                        cart.bill -= price;
                    } 
                }
               
                cart.items[itemIndex] = bookItem;
            } else {
                quantity = 1;
                cart.items.push({  bookId, name, imgurl, quantity, price, originalPrice });
            }

            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // if no cart exists for given user create new one
            let quantity = 1;
            const newCart = await cartModel.create({
                userId,
                items: [{ bookId, name, imgurl, quantity, price, originalPrice }],
                bill: quantity * price
            });
            return res.status(201).send(newCart);

        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Add Cart Item Controller ERROR ${error}`,
            success: false
        })
    }
};

const deleteCartItem = async(req, res) => {
    const userId = req.user.id;
    const { bookId } = req.query;

    try {
        let cart = await cartModel.findOne({userId});
        let itemIndex = cart.items.findIndex(p => p.bookId === bookId);

        if(itemIndex > -1){
            let bookItem = cart.items[itemIndex];
            // delete the product and decrease the bill
            cart.bill -= bookItem.quantity * bookItem.price;
            cart.items.splice(itemIndex, 1);
        }

        cart = await cart.save();
        return res.status(201).send(cart);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Delete Cart Item Controller ERROR ${error}`,
            success: false
        })
    }
};

module.exports = { getCartItems, addCartItem, addCartItemINCRDECR, deleteCartItem };