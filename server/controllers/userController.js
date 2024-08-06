const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const User = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");

//middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is Required And Must Be 6 Characters Long",
      });
    }

    //existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Been Registered With This Email!..",
      });
    }

    // hashed password

    const hashedPassword = await hashPassword(password);

    // User Save

    const user = await User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).send({
      success: true,
      message: "Registartion Successfull Please Login!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registration..Pls Verfiy!",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email or Password!..",
      });
    }

    // find user

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .send({ success: false, message: "User Not Found! Pls Register.." });
    }

    // match password

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(500)
        .send({ success: false, message: "Inavlid Username or Password.." });
    }

    //token

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // undeinfed password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Logging the User!",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    //password validate
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and must be 6 character long",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully.Pls Login Again! ",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Updating the User..",
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  updateUserController,
  requireSignIn,
};
