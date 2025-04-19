const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateEmail,
  validatePassword,
  sendVerificationEmail,
} = require("../globalFunctions");
const { ObjectId } = require('mongodb');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ message: "Please provide name", success: false });
    }

    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail) {
      return res.status(200).send({ message: "Invalid Email", success: false });
    }

    if (!isValidPassword) {
      console.log(password);
      return res
        .status(200)
        .send({
          message:
            "Invalid Password Keep Strong Password (minimum 8 maximum 15 characters)",
          success: false,
        });
    }

    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }

    const currentPassword = password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(currentPassword, salt);

    let profileImageURL = null;
    if (req.file) {
      profileImageURL = req.file.path;
    }

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      profileImg: profileImageURL,
      verificationToken: verificationToken,
      isVerified: false,
    });

    await newUser.save();

    const isSend = await sendVerificationEmail(
      req,
      res,
      name,
      email,
      verificationToken
    );

    if (isSend == true) {
      return res.status(201).send({
        message: "Registered Successfully",
        success: true,
      });
    } else {
      return res.status(500).send({
        message: "Something went wrong while registration",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Register Controller Error : ${error.message}`,
      success: false,
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res
        .status(400)
        .send({ message: "Invalid or missing token", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      email: decoded.email,
      verificationToken: token,
    });

    if (!user) {
      return res
        .status(400)
        .send({ message: "Invalid or expired token", success: false });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    return res
      .status(200)
      .send({ message: "Email verified successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Verify Email Controller Error : ${error.message}`,
      success: false,
    });
  }
};

// HANDLING LOGIN
const loginUser = async (req, res) => {
  try {

    const { name, email } = req.body;
    const user = await userModel.findOne({ email: email, isVerified: true });

    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid Credentials", success: false });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const { password: password, ...rest } = user._doc;
    const finalData = { ...rest, success: true, token: token };

    // res
    //   .cookie("access_token", token, { httpOnly: true })
    //   .status(200)
    //   .json(finalData);

    // res.cookie("access_token", token, {
    //   httpOnly: true, // Prevent JavaScript access
    //   secure: process.env.NODE_ENV === "production", // Use secure cookies in production (https)
    //   sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict", // Set for cross-origin requests
    // }).status(200)
    //   .json(finalData);

    return res.status(200).json(finalData);
      
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Login Controller Error: ${error.message}` });
  }
};

const getCurrentUser = async(req, res) => {
  try{
    const token = req.cookies.access_token || req.headers.authorization?.split(" ")[1];

    if(!token){
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }

    const user = await userModel.findById(decoded.id).select("-password");
    if(!user){
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });

  } catch(error){
    console.log(error);
    return res
      .status(500)
      .send({ message: `Get Current User Controller Error: ${error.message}` });
  }
}

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, password } = req.body;
    const filter = {};

    if (name) {
      filter.name = name;
    }

    if (email) {
      const isValidEmail = validateEmail(email);

      if (!isValidEmail) {
        return res
          .status(200)
          .send({ message: "Invalid Email", success: false });
      }

      // const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      //   expiresIn: "1h",
      // });

      // const isSend = await sendVerificationEmail(
      //   req,
      //   res,
      //   username,
      //   email,
      //   verificationToken
      // );

      // if (isSend != true){
      //   return res
      // .status(500)
      // .send({ message: `Update Profile Controller Error: Something went wrong while sending verify email` });
      // }

      filter.email = email;
      // filter.isVerified = false;
      // filter.verificationToken = verificationToken;
    }

    if (password) {
      const isValidPassword = validatePassword(password);

      if (!isValidPassword) {
        console.log(password);
        return res
          .status(200)
          .send({
            message:
              "Invalid Password Keep Strong Password (minimum 8 maximum 15 characters)",
            success: false,
          });
      }

      
      const currentPassword = password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(currentPassword, salt);
      filter.password = hashedPassword;
    }

    // const result = await userModel.updateOne(
    //   { _id: new ObjectId(userId) },
    //   { $set: filter }
    // );

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId},
      {$set: filter},
      { new: true, select: "-password" }
    )

    if(!updatedUser){
      return res.status(404).send({ message: "User not found", success: false });
    }

    return res
      .status(200)
      .send({ message: "Profile updated successfully", success: true, user: updatedUser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: `Edit Profile Controller Error: ${error.message}` });
  }
};

const logoutController = async (req, res) => {
  try {
    // res.clearCookie("access_token");
    

    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: `Logout Controller Error: ${error.message}` });
  }
};

// HANDLING AUTHORIZATION
const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({
      _id: req.body.userId,
    });
    user.password = undefined;

    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Authorization Error",
      success: false,
      error,
    });
  }
};

module.exports = {
  registerUser,
  verifyEmail,
  loginUser,
  getCurrentUser,
  updateProfile,
  logoutController,
  authController,
};
