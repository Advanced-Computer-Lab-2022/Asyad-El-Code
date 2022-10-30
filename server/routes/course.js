import express from "express";
import { createCourse,getAllCourses,filterBasedOnPrice,getCourseInformation,getCoursesDetails,getPriceOfCourses,findCourseBySubjectAndRating } from "../controller/course.js";
import { convert } from "../controller/currencyConversion.js";
const router = express.Router();


router.post("/", createCourse);
router.get("/filter/price", filterBasedOnPrice);
//For coorpar
router.get("/coursesDetails",getCoursesDetails);
router.get("/coursesPrice",getPriceOfCourses);
router.get("/courseInformation",getCourseInformation);
router.get("/searchBySubjectAndRating", findCourseBySubjectAndRating);
router.get("/getCourses",getAllCourses);
router.get('/convertCurrency',convert);



export default router;
