import express from "express";

import {
  createCourse,
  getAllCourses,
  filterBasedOnPrice,
  getCourseInformation,
  getCoursesDetails,
  getPriceOfCourses,
  findCourseBySubjectAndRating,
  filterAllCourses,
  searchByTitleOrSubjectOrInstructor,
  getCourseData,
  getCourse,
  addRating,
  addReview,
  getCoursesWithPromotion,
} from "../controller/course.js";
import { authMiddeleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", createCourse);
router.get("/filter/price", filterBasedOnPrice);
router.get("/getCourse", getCourse);
//For coorpar
router.get("/coursesDetails", getCoursesDetails);
router.get("/coursesPrice", getPriceOfCourses);
router.get("/courseInformation", getCourseInformation);
router.get("/searchBySubjectAndRating", findCourseBySubjectAndRating);

router.get("/getCourses", getAllCourses);
router.get("/filterAllCourses", filterAllCourses);

router.get("/findCourse", searchByTitleOrSubjectOrInstructor);
router.get("/getCourseData/:id", getCourseData);
router.post("/addRating", [authMiddeleware], addRating);
router.post("/addReview", [authMiddeleware], addReview);
router.get("/getCoursesWithPromotion", getCoursesWithPromotion);

export default router;
