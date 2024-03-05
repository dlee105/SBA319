import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import users from "./routes/users.mjs";
import courses from "./routes/courses.mjs";
import announcements from "./routes/announcement.mjs";
import User from "./models/usersSchema.mjs";
import Announcement from "./models/announcementSchema.mjs";
import Course from "./models/courseSchema.mjs";

import { USER_JSON } from "./utilities/users.mjs";
import { POST_JSON } from "./utilities/announcements.mjs";
import { COURSE_JSON } from "./utilities/courses.mjs";

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
app.get("/seedUser", async (req, res) => {
  await User.deleteMany({});
  await User.create(USER_JSON);
  res.send({ status: "database added" });
});

app.get("/seedCourses", async (req, res) => {
  await Course.deleteMany({});
  const AllTeacher = await User.find({ userType: "teacher" });

  const getRandomTeacherId = () => {
    const random = Math.floor(Math.random() * AllTeacher.length);
    return AllTeacher[random]._id;
  };

  const getRandomStudentId = async () => {
    const random5 = await User.aggregate([
      { $match: { userType: "student" } },
      { $sample: { size: 5 } },
    ]);
    let temp = [];
    for (let student of random5) {
      temp.push(student._id);
    }
    return temp;
  };

  const CourseList = async () => {
    const random_students = await getRandomStudentId();
    const random_teacher = getRandomTeacherId();
    const temp = COURSE_JSON.map((course) => ({
      ...course,
      instructor: random_teacher,
      student: [...random_students],
    }));
    return temp;
  };

  let data = await CourseList();

  await Course.create(data);
  res.send({ res: data });
});

app.get("/seedAnnouncements", async (req, res) => {
  await Announcement.deleteMany({});
  const AllTeacher = await User.find({ userType: "teacher" });

  const getRandomTeacherId = () => {
    const random = Math.floor(Math.random() * AllTeacher.length);
    return AllTeacher[random]._id;
  };

  const PostList = async () => {
    const random_teacher = getRandomTeacherId();
    const temp = POST_JSON.map((post) => ({
      ...post,
      author: random_teacher,
    }));
    return temp;
  };

  let data = await PostList();

  await Announcement.create(data);
  res.send({ res: data });
});

// --------------------------------------------------------------- //
app.get("/", (req, res) => {
  res.json({ status: req.body });
});

app.use("/users", users);
app.use("/courses", courses);
app.use("/announcements", announcements);
// ERROR---------------------------------------------------------- //
db.on("error", (error) => console.log(error));
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});
// --------------------------------------------------------------- //
app.listen(PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT || 5050}.`);
});
