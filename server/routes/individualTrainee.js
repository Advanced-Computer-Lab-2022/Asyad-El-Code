import express from "express";
import { createIndvidualTrainee } from "../controller/individualTrainee.js";
const router = express.Router();

router.post("/",createIndvidualTrainee);




export default router;
