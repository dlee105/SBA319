import express from "express";
import announcements from "../models/announcementSchema.mjs";
const router = express.Router();

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {});

router.get("/:id", async (req, res) => {});

router.patch("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

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
