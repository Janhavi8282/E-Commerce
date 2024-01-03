const User = require("../models/User");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  //create User
  createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
    });
    //encrypt the password of user
    try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  //login User
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json("Wrong credentials provide a valid email");
      //decrypt the password of user
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const decryptedPass = decryptedPassword.toString(CryptoJS.enc.Utf8);
      //check encrypted and decrytpted password whether it matches or not
      decryptedPass !== req.body.password &&
        res.status(401).json("Wrong password");

      const userToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SEC,
        { expiresIn: "7d" } // password expires in 7 days
      );

      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
      res.status(200).json({ ...userData, token: userToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  },
};
