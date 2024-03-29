import express from "express";
import { createCorporateTrainee, getAllCorporateTrainees, 
    getCorporateTrainee, deleteCorporateTrainee, updateCorporateTrainee, createCourseRequest} from "../controller/corporateTrainee.js";
const router = express.Router();

router.post("/newCourseRequest", createCourseRequest);
router.post("/", createCorporateTrainee);
router.get("/", getAllCorporateTrainees);
router.get("/:id", getCorporateTrainee);
router.delete("/:id", deleteCorporateTrainee);
router.put("/:id", updateCorporateTrainee);





export default router;
