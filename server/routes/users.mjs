import express from "express";
import users from "../models/usersSchema.mjs";
const router = express.Router();

router.get("/", async (req, res) => {
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
    userType: req.body.userType,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message, error: "bad user data" });
  }
});

router.get("/:id", getUserId, async (req, res) => {
  // DISPLAY SELECTED USER
  res.send(res.user);
});

router.patch("/:id", getUserId, async (req, res) => {
  // EDIT SELECTED USER
  if (req.body.firstName != null) {
    res.user.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.user.lastName = req.body.lastName;
  }
  if (req.body.email != res.user.email) {
    res.user.email = req.body.email;
  }
  if (req.body.username != res.user.username) {
    res.user.username = req.body.username;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
router.delete("/:id", getUserId, async (req, res) => {
  // DELETE SELECTED USER
  try {
    await res.user.deleteOne();
    res.json({ message: "user deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function getUserId(req, res, next) {
  let user;
  try {
    user = await users.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Users does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

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
