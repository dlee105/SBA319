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

router.get("/:id", getCourseId, async (req, res) => {
  res.send(res.course);
});

router.patch("/:id", getCourseId, async (req, res) => {
  if (req.body.courseName != null) res.course.courseName = req.body.courseName;
  if (req.body.description != null)
    res.course.description = req.body.description;
  if (req.body.instructor != null) res.course.instructor = req.body.instructor;
  if (req.body.student != null) res.course.student = req.body.student;

  try {
    const updatedCourse = await res.course.save();
    res.json(updatedCourse);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getCourseId, async (req, res) => {
  try {
    await res.course.deleteOne();
    res.json({ message: "course deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

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
