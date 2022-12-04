import express from "express";
import { convert } from "../controller/currencyConversion.js";

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
} from "../controller/course.js";

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
router.post("/addRating", addRating);
router.post("/addReview", addReview);

export default router;
