import express from "express";
import announcements from "../models/announcementSchema.mjs";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allAnnounce = await announcements.find();
    res.json(allAnnounce);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const date = new Date();
  const announcement = new announcements({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    createdAt: date.getDate(),
    updatedAt: date.getDate(),
  });

  try {
    const newAnnouncement = await announcement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res
      .status(400)
      .json({ message: err.message, error: "bad data for course" });
  }
});

router.get("/:id", getAnnouncementId, async (req, res) => {
  res.send(res.announcement);
});

router.patch("/:id", getAnnouncementId, async (req, res) => {
  if (req.body.title != null) res.announcement.title = req.body.title;
  if (req.body.content != null) res.announcement.content = req.body.content;
  if (req.body.author != null) res.announcement.author = req.body.author;
  if (req.body.createdAt != null)
    res.announcement.createdAt = req.body.createdAt;
  if (req.body.updatedAt != null)
    res.announcement.updatedAt = req.body.updatedAt;

  try {
    const updatedCourse = await res.announcement.save();
    res.json(updatedCourse);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getAnnouncementId, async (req, res) => {
  try {
    await res.announcement.deleteOne();
    res.json({ message: "post deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function getAnnouncementId(req, res, next) {
  let announcement;
  try {
    announcement = await announcements.findById(req.params.id);
    if (announcement == null) {
      return res.status(404).json({ message: "Users does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.course = course;
  next();
}

export default router;
