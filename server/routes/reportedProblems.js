import { createReportedProblem,getAllReportedProblems, getReportedProblemByReporterEmail, getReportedProblemResolved, getReportedProblemUnresolved, updateReportedProblem } from "../controller/reportedProblems.js";
import express from "express";


const router = express.Router();

router.post("/", createReportedProblem);
router.get("/", getAllReportedProblems);
router.get("/getReportedProblemByReporterEmail", getReportedProblemByReporterEmail);
router.put("/:id", updateReportedProblem);
router.post("/getResolvedProblems", getReportedProblemResolved);
router.post("/getUnResolvedProblems", getReportedProblemUnresolved);

export default router;
