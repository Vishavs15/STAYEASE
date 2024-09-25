const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = "r93c8uKVU*&^gTVtb97t9";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGODB_CONNECT);

app.get("/test", (req, res) => {
  res.json("Backend Start");
});

// ---------------------------------------------------------- SIGNIN -------------------------------------------------------- 

app.post("/signin", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: "User creation failed" });
  }
});

// ---------------------------------------------------------- LOGIN -------------------------------------------------------- 

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ 
        email: userDoc.email, 
        id: userDoc._id,
        name:userDoc.name 
      }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        });
    } else {
      res.status(422).json("Password is incorrect");
    }
  } else {
    res.json("USer not found");
  }
});

// ---------------------------------------------------------- LOGOUT -------------------------------------------------------- 

app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true);
})

// ---------------------------------------------------------- PROFILE -------------------------------------------------------- 

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});

// ---------------------------------------------------------- PROFILE -------------------------------------------------------- 

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName, // Add a slash before uploads this save img in to upload file 
    timeout: 30000, // Increase timeout to 30 seconds
  });

  res.json({ fileName: newName }); // Return an object for consistency
});

// ---------------------------------------------------------- PROFILE -------------------------------------------------------- 

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100), (req,res) => {
  const uploadedFiles = []
  for(let i = 0; i < req.files.length; i++){
    const {path,originalname} = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads/', ''));
  }
  res.json(uploadedFiles);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
