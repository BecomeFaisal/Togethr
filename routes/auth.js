const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json(`User: ${username} registered!`);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json("User not found");
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json("Invalid Password");
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  });
  const upload = multer({ storage });
  
  router.post('/post', upload.single('image'), async (req, res) => {
    try {
      const newPost = new Post({
        user: req.body.userId,
        caption: req.body.caption,
        image: req.file.path,
      });
      await newPost.save();
      res.status(200).json(newPost);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });

module.exports = router;
