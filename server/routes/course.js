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
} from "../controller/course.js";

const router = express.Router();

router.post("/", createCourse);
router.get("/filter/price", filterBasedOnPrice);
//For coorpar
router.get("/coursesDetails", getCoursesDetails);
router.get("/coursesPrice", getPriceOfCourses);
router.get("/courseInformation", getCourseInformation);
router.get("/searchBySubjectAndRating", findCourseBySubjectAndRating);

router.get("/getCourses", getAllCourses);
router.get("/filterAllCourses", filterAllCourses);

router.get("/findCourse", searchByTitleOrSubjectOrInstructor);





export default router;
