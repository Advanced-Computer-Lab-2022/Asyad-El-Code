import express from "express";
import { createCourse } from "../controller/course.js";
const router = express.Router();

router.post("/",createCourse);




export default router;