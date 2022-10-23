import express from "express";
import { getCoursesDetails,getPriceOfCourses } from "../controller/mainController.js";
const router = express.Router();

router.get("/coursesDetails",getCoursesDetails);
router.get("/coursesPrice",getPriceOfCourses);




export default router;