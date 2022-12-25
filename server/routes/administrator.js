import express from "express";
import { createAdministrator,getAdministrators, getAdministratorByUserName,
    deleteAdministrator, updateAdministrator,getAdministratorById,createInstructor, getCourseRequests, acceptCourseRequest, deleteCourseRequest, rejectCourseRequest } from "../controller/administrator.js";
import {createCorporateTrainee} from "../controller/corporateTrainee.js";

const router = express.Router();

router.post("/",createAdministrator);
router.get("/courseRequests", getCourseRequests);
router.get("/",getAdministrators);
router.get("/:userName",getAdministratorByUserName);
router.get("/:id",getAdministratorById);
router.delete("/:id",deleteAdministrator);
router.post("/addInstructor",createInstructor);
router.post("/AddCorperateTrainee",createCorporateTrainee);
router.put("/:id",updateAdministrator);
router.post("/acceptCourseRequest",acceptCourseRequest);
router.delete("/deleteCourseRequest/:id",deleteCourseRequest);
router.post("/rejectCourseRequest",rejectCourseRequest);




export default router;
