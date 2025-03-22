const express = require("express");

const router = express.Router();
const { getCartItems, addCartItem, addCartItemINCRDECR, deleteCartItem } = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/my-cart", authMiddleware, getCartItems);
router.post("/addToCart",authMiddleware, addCartItem);
router.put("/addCartItemIncrDecr", authMiddleware, addCartItemINCRDECR);
router.delete("/deleteCartItem",authMiddleware, deleteCartItem);

module.exports = router;