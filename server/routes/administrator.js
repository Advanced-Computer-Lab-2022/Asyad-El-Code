import express from "express";
import { createAdministrator,getAdministrators, getAdministrator,deleteAdministrator } from "../controller/administrator.js";
import {createCorporateTrainee} from "../controller/corporateTrainee.js"
import {createInstructor} from "../controller/instructor.js"
const router = express.Router();

router.post("/",createAdministrator);
router.get("/",getAdministrators);
router.get("/:userName",getAdministrator);
router.delete("/",deleteAdministrator);
router.post("/instructor",createInstructor);
router.post("/corperateTrainee",createCorporateTrainee);




export default router;
