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
  updateRating,
  addRating,
  addReview,
  definePromotion,
} from "../controller/instructor.js";
import { viewCourseTitles } from "../controller/instructor.js";
import { addNewCourse } from "../controller/instructor.js";
import { searchByTitleOrSubjectOrInstructor } from "../controller/course.js";
import { authMiddeleware } from "../middlewares/auth.js";
const router = express.Router();
router.get("/filterInstructorCourses", filterInstructorCourses);
router.post("/", createInstructor);
router.get("/", getInstructors);
router.get("/:id", getInstructor);
router.get("/viewTitles/:id", viewCourseTitles);

router.get("/filterBySubjectAndPrice/:id", filterCourseBySubjectAndPrice);

router.post("/addNewCourse/:id", [authMiddeleware], addNewCourse);
router.patch("/updateInformation/:id", authMiddeleware, updateInformation);
router.get("/searchByTitleOrSubject/:id", searchByTitleOrSubject);

router.get("/filterInstructorCourses", filterInstructorCourses);
router.post("/addRating ", addRating);
router.post("/addReview", addReview);
router.get(
  "/getAllInstructorCourses/:id",
  [authMiddeleware],
  getAllInstructorCourses
);

router.post("/updateRating/:id", authMiddeleware, updateRating);
router.patch("/definePromotion", authMiddeleware, definePromotion);

export default router;
