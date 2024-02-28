import express from "express";
import db from "../databases/connection.mjs";
import users from "../models/usersSchema.mjs";
const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET ALL USERS
  try {
    const allUsers = await users.find();
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", async (req, res) => {
  const user = new users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message, error: "bad user data" });
  }
});

router.get("/:id", (req, res, next) => {
  // DISPLAY SELECTED USER
  res.json({ success: true });
});

router.patch("/:id", (req, res, next) => {
  // EDIT SELECTED USER
  res.json({ success: true });
});
router.delete("/:id", (req, res, next) => {
  // DELETE SELECTED USER
  res.json({ success: true });
});

export default router;

// username: "jdoe1",
//     email: "jdoe1@aoe.io",
//     password: "testing123",
//     firstName: "John",
//     lastName: "Doe",
//     age: 1000,
//     roles: ["Buyer"],
//     address: {
//       street: "123 Coconut street",
//       city: "England",
//       state: "Minnesota",
//       zipcode: 99999,
//     },
