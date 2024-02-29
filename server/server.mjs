import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import users from "./routes/users.mjs";
import cors from "cors";

dotenv.config();
mongoose.connect(process.env.ATLAS_URI);

const app = express();
const PORT = process.env.PORT || 5050;
const db = mongoose.connection;

db.once("open", () => console.log("DB connected")); // test db connection

// -------------------MIDDLEWARE---------------------------------- //
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors());
// --------------------------------------------------------------- //
app.get("/", (req, res) => {
  res.json({ status: req.body });
});

app.use("/users", users);
// ERROR---------------------------------------------------------- //
db.on("error", (error) => console.log(error));
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});
// --------------------------------------------------------------- //
app.listen(PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}.`);
});
