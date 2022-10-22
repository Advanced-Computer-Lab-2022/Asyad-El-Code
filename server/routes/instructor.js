import express from "express";
import { createInstructor, findCourseBySubjectAndRating } from "../controller/instructor.js";
import { viewCourseTitles } from "../controller/instructor.js";
const router = express.Router();

router.post("/", createInstructor);
router.get("/viewTitles/:id", viewCourseTitles);
router.get("/searchBySubjectAndRating",findCourseBySubjectAndRating)

export default router;
