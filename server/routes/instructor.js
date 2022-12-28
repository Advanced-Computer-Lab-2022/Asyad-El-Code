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
<<<<<<< HEAD
  addRating,
  addReview,
=======
  definePromotion,
>>>>>>> 25cb13444cbe8174b5c5bffa5586f09933725a4a
} from "../controller/instructor.js";
import { viewCourseTitles } from "../controller/instructor.js";
import { addNewCourse } from "../controller/instructor.js";
import { searchByTitleOrSubjectOrInstructor } from "../controller/course.js";
const router = express.Router();
router.get("/filterInstructorCourses", filterInstructorCourses);
router.post("/", createInstructor);
router.get("/", getInstructors);
router.get("/:id", getInstructor);
router.get("/viewTitles/:id", viewCourseTitles);

router.get("/filterBySubjectAndPrice/:id", filterCourseBySubjectAndPrice);

router.post("/addNewCourse/:id", addNewCourse);
router.patch("/updateInformation/:id", updateInformation);
router.get("/searchByTitleOrSubject/:id", searchByTitleOrSubject);

router.get("/getAllInstructorCourses/:id", getAllInstructorCourses);
<<<<<<< HEAD
router.get("/filterInstructorCourses", filterInstructorCourses);
router.post("/addRating", addRating);
router.post("/addReview", addReview);
=======

router.post("/updateRating/:id", updateRating);
router.patch("/definePromotion", definePromotion);
>>>>>>> 25cb13444cbe8174b5c5bffa5586f09933725a4a

export default router;
