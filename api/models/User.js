const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;