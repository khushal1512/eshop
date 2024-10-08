const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");

// Route to create a new user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userEmail = await User.findOne({ email }); // Make sure to use `findOne` instead of `FindOne`

    if (userEmail) {
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

module.exports = router;
