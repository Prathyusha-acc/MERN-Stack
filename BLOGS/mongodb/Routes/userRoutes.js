const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecrete = "IamPrathyushaFromSiddipetDirsticSayHiTOall";
const {
  registerController,
  getAllUsers,
  loginController,
} = require("../controller/userController");

//Get Users
router.get("/all-users", getAllUsers);
//Create Users
router.post("/create-user", registerController);

//LOGIN
router.post("/login-user", loginController);

module.exports = router;
