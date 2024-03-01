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
  userType: {
    type: String,
    enum: ["teacher", "student"],
    required: true,
  },
});

userSchema.index({ username: 1 }); // Index for username
userSchema.index({ email: 1 }); // Index for email
userSchema.index({ userType: 1 }); // Index for userType

const User = mongoose.model("Users", userSchema);

export default User;
