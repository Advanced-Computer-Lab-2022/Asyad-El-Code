import express from "express";
import { createExercise } from "../controller/exercise.js";
const router = express.Router();

router.post("/", createExercise);

export default router;
