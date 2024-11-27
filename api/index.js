const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/booking");
const PlaceModel = require("./models/Place");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.SECRET_KEY);
// const paymentRoutes = require('./payments');
// app.use('/api/payments', paymentRoutes);


require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGODB_CONNECT);

getUserDataFromToken = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    })
  })
}

app.use(async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const userData = await new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, {}, (err, decodedData) => {
          if (err) reject(err);
          resolve(decodedData);
        });
      });

      // Update lastActive for the user
      await User.findByIdAndUpdate(userData.id, { lastActive: new Date() });
    } catch (error) {
      console.error("Error updating last active time:", error);
    }
  }
  next(); // Proceed to the next middleware or route handler
});

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Middleware to update last active time
app.use(async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const userData = await new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, {}, (err, decodedData) => {
          if (err) reject(err);
          resolve(decodedData);
        });
      });

      // Update lastActive for the user
      await User.findByIdAndUpdate(userData.id, { lastActive: new Date() });
    } catch (error) {
      console.error("Error updating last active time:", error);
    }
  }
  next(); // Proceed to the next middleware or route handler
});

// Routes start here
app.get("/test", (req, res) => {
  res.json("Backend Start");
});

// Add all other routes below

app.get("/dashboard-stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalBookings = await Booking.countDocuments({});
    const totalAccommodations = await Place.countDocuments({});
    
    res.json({
      totalUsers,
      totalBookings,
      totalAccommodations,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

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
      userDoc.lastActive = new Date(); // Update lastActive to current time
      await userDoc.save(); // Save the updated user document

      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Password is incorrect");
    }
  } else {
    res.json("User not found");
  }
});

// ---------------------------------------------------------- LOGOUT --------------------------------------------------------

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// ---------------------------------------------------------- PROFILE --------------------------------------------------------

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json(null); // No token case
  }

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (!userData?.id) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    try {
      const { name, email, _id } = await User.findById(userData.id);

      if (!name || !email || !_id) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ name, email, _id });
    } catch (error) {
      res.status(500).json({ error: "Database query failed" });
    }
  });
});

// ---------------------------------------------------------- UPLOAD_BY_LINK --------------------------------------------------------

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName, // Add a slash before uploads this save img in to upload file
  });

  res.json({ fileName: newName }); // Return an object for consistency
});

// ---------------------------------------------------------- UPLOADS --------------------------------------------------------

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

// ---------------------------------------------------------- PLACES --------------------------------------------------------

app.post("/places", (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos, // Change to 'addedPhotos' for consistency with the frontend
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  // Debugging: Check if maxGuests is received correctly
  console.log("Request Body:", req.body);
  console.log("Max Guests:", maxGuests);

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,price,
      title,
      address,
      photos: addedPhotos, // Make sure this uses 'addedPhotos'
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

// ---------------------------------------------------------- PLACES --------------------------------------------------------

app.get("/user-places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.delete('/user-places/:id', (req, res) => {
  const { id } = req.params;
  // Logic to delete the place from the database using the id
  Place.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: 'Place deleted successfully' }))
    .catch(err => res.status(500).json({ message: 'Failed to delete place', error: err }));
});

// ---------------------------------------------------------- PLACES/:ID --------------------------------------------------------

app.get("/places/:id", async (req, res) => { // this give details about specific place
  const { id } = req.params;
  // res.json(req.params);
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos, // Change to 'addedPhotos' for consistency
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    // console.log(userData.id);
    // console.log(placeDoc.owner.toString());
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos, // Use 'addedPhotos' here as well 
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
}); 

app.get('/places', async (req,res) => {
  res.json( await Place.find() );
})

// ---------------------------------------------------------- USERS --------------------------------------------------------

app.get("/users", async (req, res) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const users = await User.find({ email: { $ne: adminEmail  } }); // Exclude admin

  const currentTime = new Date();
  const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000);

  const usersWithStatus = users.map((user) => ({
    ...user.toObject(),
    isOnline: user.lastActive > fiveMinutesAgo,
  }));

  res.json(usersWithStatus);
});


app.get("/user-details/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const places = await Place.find({ owner: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        role: user.role || "User", // Include role if needed
      },
      places,
    });
  } catch (error) {
    console.error("Error in /user-details/:id route:", error);
    res.status(500).json({ error: "Failed to fetch user details", details: error.message });
  }
});

// ---------------------------------------------------------- UPDATE LAST ACTIVE --------------------------------------------------------

app.post("/update-last-active", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    try {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
          res.status(401).json({ error: "Unauthorized" });
          return;
        }

        // Update the lastActive field to the current time
        await User.findByIdAndUpdate(userData.id, { lastActive: new Date() });
        res.status(200).json({ message: "Last active time updated" });
      });
    } catch (error) {
      console.error("Error updating last active time:", error);
      res.status(500).json({ error: "Failed to update last active time" });
    }
  } else {
    res.status(401).json({ error: "User not logged in" });
  }
});

// ---------------------------------------------------------- DELETE USER --------------------------------------------------------

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id); // Delete user by ID
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// ---------------------------------------------------------- BOOKINGS --------------------------------------------------------

app.post('/bookings', async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const {
    place, checkIn: checkinDate, checkOut: checkoutDate, maxGuests, name, phone, price,
  } = req.body;

  Booking.create({   
    place, checkinDate, checkoutDate, maxGuests, name, phone, price,
    user:userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Booking could not be created' });
    });
});

app.get('/bookings', async (req, res) => {
  try {
    const userData = await getUserDataFromToken(req);

    const bookings = await Booking.find({ user: userData.id })
      .populate('place')  // Populate place details (which should include guests)
      .lean();  // Convert to plain JavaScript objects

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    // Add number of guests to each booking
    const bookingsWithGuests = bookings.map(booking => ({
      ...booking,
      guests: booking.place.guests,  // Add guests information from the place
    }));

    res.json(bookingsWithGuests);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Error fetching bookings" });
  }
});

app.get('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('place');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error });
  }
});


app.delete("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id); // Assuming you're using Mongoose
    res.status(200).send({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting booking", error });
  }
});

app.get('/bookings', async (req, res) => {
  const { userId } = req.query;
  try {
    const filter = userId ? { user: userId } : {}; // Filter by user ID if provided
    const bookings = await Booking.find(filter).populate('place');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});



// Endpoint to create a Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency,
      });
      res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/payments/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount, // Amount should be in the smallest currency unit (e.g., paise for INR)
          currency,
      });

      res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000"); 
}); 