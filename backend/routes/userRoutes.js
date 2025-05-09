const express = require("express");
const authMiddleware  = require("../middlewares/authMiddleware")
const {  registerUser, loginUser, logoutController, authController, verifyEmail, updateProfile, getCurrentUser, verifyOtp, resendOtp } = require("../controllers/userController");
const upload = require("../middlewares/upload");

const router = express.Router();


router.post("/register", upload.single('image'), registerUser)
router.post("/verify-otp", verifyOtp)
router.post("/resend-otp", resendOtp)
router.get('/verifyemail', verifyEmail)
router.post("/login",upload.single('image'), loginUser)
router.get("/me", getCurrentUser);
router.put("/updateProfile", upload.single('image'),authMiddleware, updateProfile)
router.post("/logout", logoutController);
router.post("/getUserData", authMiddleware, authController);

module.exports = router;