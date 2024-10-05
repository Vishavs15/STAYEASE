const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  lastActive: {
    type: Date,
    default: Date.now, // Initialize with the current time
  }
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;