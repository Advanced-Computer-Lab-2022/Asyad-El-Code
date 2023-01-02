import {
  createReportedProblem,
  getAllReportedProblems,
  getReportedProblemByReporterEmail,
  getReportedProblemResolved,
  getReportedProblemUnresolved,
  updateReportedProblem,
} from "../controller/reportedProblems.js";
import express from "express";
import { authMiddeleware } from "../middlewares/auth.js";
import { checkAdmin } from "../middlewares/admin.js";

const router = express.Router();

router.post("/", [authMiddeleware], createReportedProblem);
router.get("/", getAllReportedProblems);
router.get(
  "/getReportedProblemByReporterEmail",
  getReportedProblemByReporterEmail
);
router.put("/:id", [authMiddeleware, checkAdmin], updateReportedProblem);
router.post("/getResolvedProblems", getReportedProblemResolved);
router.post("/getUnResolvedProblems", getReportedProblemUnresolved);

export default router;
