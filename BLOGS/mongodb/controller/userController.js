const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

//Register
exports.registerController = async (req, res) => {
  console.log("Name :", req.body.name);
  try {
    let { name, email, password } = req.body;
    //Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill all Fields",
      });
    }
    //existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user email already exist",
      });
    }

    console.log("Name :", name);
    //Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;
    await User.create({
      name: name,
      email: email,
      password: password,
    });
    console.log("Success");
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In RegisterController",
      error,
    });
    //res.json({ success: false });
  }
  console.log("Success user");
};
//Get users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send({
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error In Get All Users",
      error,
    });
  }
};

//Login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill all Fields",
      });
    }
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Try logging with correct email" });
    }
    const pwdCompare = await bcrypt.compare(password, userData.password);
    if (!pwdCompare) {
      return res
        .status(400)
        .json({ errors: "Try logging with correct password" });
    }
    const data = {
      user: {
        id: userData.id,
      },
    };
    return res
      .status(200)
      .json({ success: true, message: "Login successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in Login" });
  }
  console.log("Success user");
};
