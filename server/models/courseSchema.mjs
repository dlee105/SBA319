import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

courseSchema.index({ title: "text", description: "text" }); // Index for full-text search on title and description
courseSchema.index({ instructor: 1 }); // Index for instructor
courseSchema.index({ students: 1 }); // Index for students
courseSchema.index({ startDate: 1 }); // Index for startDate
courseSchema.index({ endDate: 1 }); // Index for endDate

const Course = mongoose.model("Course", courseSchema);

export default Course;
