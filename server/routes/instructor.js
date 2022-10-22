import express from "express";
import { createInstructor } from "../controller/instructor.js";
import { viewCourseTitles } from "../controller/instructor.js";
import { addNewCourse } from "../controller/instructor.js";
const router = express.Router();

router.post("/", createInstructor);
router.get("/viewTitles/:id", viewCourseTitles);
router.post("/addNewCourse/:id", addNewCourse);

export default router;
