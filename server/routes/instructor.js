import express from "express";
import {
  createInstructor,
  filterCourseBySubjectAndPrice,

  filterInstructorCourses,
  getAllInstructorCourses,

  searchByTitleOrSubject,

  updateInformation,
  getInstructors,
  getInstructor,
  updateRating
} from "../controller/instructor.js";
import { viewCourseTitles } from "../controller/instructor.js";
import { addNewCourse } from "../controller/instructor.js";
import { searchByTitleOrSubjectOrInstructor } from "../controller/course.js";
const router = express.Router();

router.post("/", createInstructor);
router.get("/", getInstructors);
router.get("/:id", getInstructor);
router.get("/viewTitles/:id", viewCourseTitles);

router.get("/filterBySubjectAndPrice/:id", filterCourseBySubjectAndPrice);

router.post("/addNewCourse/:id", addNewCourse);
router.patch("/updateInformation/:id", updateInformation);
router.get("/searchByTitleOrSubject/:id", searchByTitleOrSubject);

router.get("/getAllInstructorCourses/:id", getAllInstructorCourses);
router.get("/filterInstructorCourses", filterInstructorCourses);
router.post("/updateRating/:id", updateRating);

export default router;
