import express from "express";
import { createCourse,filterBasedOnPrice,getCourseInformation,getCoursesDetails,getPriceOfCourses,findCourseBySubjectAndRating } from "../controller/course.js";
const router = express.Router();

router.post("/", createCourse);
router.get("/filter/price", filterBasedOnPrice);
router.get("/coursesDetails",getCoursesDetails);
router.get("/coursesPrice",getPriceOfCourses);
router.get("/courseInformation",getCourseInformation);
router.get("/searchBySubjectAndRating", findCourseBySubjectAndRating);


export default router;
