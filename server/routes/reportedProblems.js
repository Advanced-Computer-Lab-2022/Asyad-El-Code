import { createReportedProblem,getAllReportedProblems, getReportedProblemByReporterEmail } from "../controller/reportedProblems.js";
import express from "express";


const router = express.Router();

router.post("/", createReportedProblem);
router.get("/", getAllReportedProblems);
router.get("/getReportedProblemByReporterEmail", getReportedProblemByReporterEmail);

export default router;
