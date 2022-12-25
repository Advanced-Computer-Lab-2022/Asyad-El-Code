import { createReportedProblem,getAllReportedProblems, getReportedProblemByReporterEmail, updateReportedProblem } from "../controller/reportedProblems.js";
import express from "express";


const router = express.Router();

router.post("/", createReportedProblem);
router.get("/", getAllReportedProblems);
router.get("/getReportedProblemByReporterEmail", getReportedProblemByReporterEmail);
router.put("/:id", updateReportedProblem);

export default router;
