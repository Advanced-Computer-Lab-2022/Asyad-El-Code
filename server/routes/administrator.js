import express from "express";
import { createAdministrator,getAdministrators, getAdministratorByUserName,
    deleteAdministrator, updateAdministrator,getAdministratorById,createInstructor } from "../controller/administrator.js";
import {createCorporateTrainee} from "../controller/corporateTrainee.js"
// import {createInstructor} from "../controller/instructor.js"
const router = express.Router();

router.post("/",createAdministrator);
router.get("/",getAdministrators);
router.get("/:userName",getAdministratorByUserName);
router.get("/:id",getAdministratorById);
router.delete("/:id",deleteAdministrator);
router.post("/addInstructor",createInstructor);
router.post("/AddCorperateTrainee",createCorporateTrainee);
router.put("/:id",updateAdministrator);




export default router;
