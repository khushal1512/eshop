const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

// Route to create a new user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userEmail = await User.findOne({ email }); // Make sure to use `findOne` instead of `FindOne`

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        } else {
          res.json({ message: "File deleted successfully" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    // Save user details
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = new User({
      name,
      email,
      password,
      avatar: fileUrl,
    });

    await user.save();

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try  {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate to your account: ${activationUrl}`
      })
    } catch(err) {
      return next((new ErrorHandler(err.message, 500)));
    }
    console.log(user);
    res.status(201).json({
      message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    next(error); // Pass error to error handler
  }
});

// activation for email
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_TOKEN, {
    eexpiresIn: "5m",
  });
};

module.exports = router;
