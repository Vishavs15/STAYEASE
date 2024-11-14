// In booking.js or wherever you define the Booking schema
const mongoose = require('mongoose');
const Place = require('./Place'); // Import the Place model here

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' }, // Ensure "Place" is used
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkinDate: { type: Date, required: true },
  checkoutDate: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
