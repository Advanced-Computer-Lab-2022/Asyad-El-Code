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
} from "../controller/individualTrainee.js";
const router = express.Router();
import pdf from "html-pdf";
import path from "path";
const __dirname = path.resolve();

router.post("/", createIndvidualTrainee);
router.get("/", getAllIndividualTrainees);
router.get("/getNotes", getNotes);

router.delete("/:id", deleteIndividualTrainee);
router.put("/:id", updateIndividualTrainee);
router.post("/enroll", enrollCourse);
router.post("/addGrade", addGrade);
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
router.post("/checkout", payCourse);

export default router;
