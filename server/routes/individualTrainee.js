import express from "express";
import {
  createIndvidualTrainee,
  getAllIndividualTrainees,
  getIndividualTrainees,
  deleteIndividualTrainee,
  updateIndividualTrainee,
  enrollCourse,
  addGrade,
} from "../controller/individualTrainee.js";
const router = express.Router();

router.post("/", createIndvidualTrainee);
router.get("/", getAllIndividualTrainees);
router.get("/:id", getIndividualTrainees);
router.delete("/:id", deleteIndividualTrainee);
router.put("/:id", updateIndividualTrainee);
router.post("/enroll", enrollCourse);
router.post("/addGrade", addGrade);

export default router;
