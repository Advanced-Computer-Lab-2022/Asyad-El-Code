import express from "express";
import {
  createInstructor,
  filterCourseBySubjectAndPrice,
  findCourseBySubjectAndRating,
} from "../controller/instructor.js";
import { viewCourseTitles } from "../controller/instructor.js";
import { addNewCourse } from "../controller/instructor.js";
const router = express.Router();

router.post("/", createInstructor);
router.get("/viewTitles/:id", viewCourseTitles);

router.get("/searchBySubjectAndRating", findCourseBySubjectAndRating);
router.get("/filterBySubjectAndPrice/:id", filterCourseBySubjectAndPrice);

router.post("/addNewCourse/:id", addNewCourse);

export default router;
