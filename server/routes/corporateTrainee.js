import express from "express";
import { createCorporateTrainee } from "../controller/corporateTrainee.js";
const router = express.Router();

router.post("/", createCorporateTrainee);
router.get("/", createCorporateTrainee);




export default router;
