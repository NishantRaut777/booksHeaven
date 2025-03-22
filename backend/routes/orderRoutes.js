const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { checkoutOrder, getOrders } = require("../controllers/orderController");


router.post("/checkoutOrder", authMiddleware, checkoutOrder);
router.get("/getOrders", authMiddleware, getOrders);

module.exports = router;