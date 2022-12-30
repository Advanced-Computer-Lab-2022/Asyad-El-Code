import express from "express";
import {
  createAdministrator,
  getAdministrators,
  getAdministratorByUserName,
  addCorporateTrainee,
  deleteAdministrator,
  updateAdministrator,
  getAdministratorById,
  addInstructor,
  getCourseRequests,
  acceptCourseRequest,
  deleteCourseRequest,
  rejectCourseRequest,
} from "../controller/administrator.js";

const router = express.Router();

router.post("/", createAdministrator);
router.get("/courseRequests", getCourseRequests);
router.get("/", getAdministrators);
router.get("/:userName", getAdministratorByUserName);
router.get("/:id", getAdministratorById);
router.delete("/:id", deleteAdministrator);
router.post("/addAdmin", createAdministrator);
router.post("/addInstructor", addInstructor);
router.post("/addCorporate", addCorporateTrainee);
router.put("/:id", updateAdministrator);
router.post("/acceptCourseRequest", acceptCourseRequest);
router.delete("/deleteCourseRequest/:id", deleteCourseRequest);
router.post("/rejectCourseRequest", rejectCourseRequest);

export default router;
