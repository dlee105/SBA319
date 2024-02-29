import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  userType: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
  },
});

const User = mongoose.model("Users", userSchema);

export default User;
