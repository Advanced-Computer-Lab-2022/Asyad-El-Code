import express from "express";
import {
  createIndvidualTrainee,
  getAllIndividualTrainees,
  getIndividualTrainees,
  deleteIndividualTrainee,
  updateIndividualTrainee,
  enrollCourse,
  addGrade,
  addSeenContent,
  addNote,
  createPdf,
  getNotes,
  payCourse,
  getIndividualTrainee,
} from "../controller/individualTrainee.js";
const router = express.Router();
import pdf from "html-pdf";
import path from "path";
import { authMiddeleware } from "../middlewares/auth.js";
const __dirname = path.resolve();
router.put("/:id", authMiddeleware, updateIndividualTrainee);

router.post("/", createIndvidualTrainee);
router.get("/", getAllIndividualTrainees);
router.get("/:id", getIndividualTrainee);
router.get("/getNotes", authMiddeleware, getNotes);

router.delete("/:id", deleteIndividualTrainee);
router.post("/enroll", authMiddeleware, enrollCourse);
router.post("/addGrade", authMiddeleware, addGrade);
router.post("/addSeenContent", addSeenContent);
router.post("/addNote", addNote);

router.get("/getTrainee/:id", getIndividualTrainees);

router.post("/createPdf", (req, res) => {
  pdf
    .create(createPdf(req.body), {})
    .toFile("test.pdf", function (err, response) {
      if (err) return console.log("ERROR", err);
      else if (response) {
        res.send(Promise.resolve());
      }
    });
});
router.get("/getPdf", (req, res) => {
  res.sendFile(`${__dirname}/test.pdf`);
});
router.get("/getNotes", getNotes);
//TODO
// router.get("/getAllNotes",getAllNotes);
router.post("/enrollCourse", enrollCourse);
router.post("/payCourse", payCourse);

export default router;
