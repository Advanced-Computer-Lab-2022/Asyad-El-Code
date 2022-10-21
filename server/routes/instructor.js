import express from "express";
import { createInstructor } from "../controller/instructor.js";
const router = express.Router();

router.post("/",createInstructor);




export default router;
