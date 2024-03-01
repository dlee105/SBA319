import express from "express";
import courses from "../models/courseSchema.mjs";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allCourses = await courses.find();
    res.json(allCourses);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", async (req, res) => {
  const course = new courses({
    courseName: req.body.courseName,
    description: req.body.description,
    instructor: req.body.instructor,
    student: req.body.student,
  });
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res
      .status(400)
      .json({ message: err.message, error: "bad data for course" });
  }
});

router.get("/:id", async (req, res) => {});
router.post("/:id", async (req, res) => {});
router.patch("/:id", async (req, res) => {});
router.delete("/:id", async (req, res) => {});

async function getCourseId(req, res, next) {
  let course;
  try {
    course = await courses.findById(req.params.id);
    if (course == null) {
      return res.status(404).json({ message: "Users does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.course = course;
  next();
}

export default router;
