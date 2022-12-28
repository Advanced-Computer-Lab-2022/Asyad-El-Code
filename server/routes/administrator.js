import express from "express";
import {
  createAdministrator,
  getAdministrators,
  getAdministratorByUserName,
  deleteAdministrator,
  updateAdministrator,
  getAdministratorById,
  createInstructor,
  getCourseRequests,
  acceptCourseRequest,
  deleteCourseRequest,
  rejectCourseRequest,
} from "../controller/administrator.js";
import { createCorporateTrainee } from "../controller/corporateTrainee.js";
import { checkAdmin } from "../middlewares/admin.js";
import { authMiddeleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", createAdministrator);
router.get("/courseRequests", [authMiddeleware, checkAdmin], getCourseRequests);
router.get("/", [authMiddeleware, checkAdmin], getAdministrators);
router.get("/:userName", getAdministratorByUserName);
router.get("/:id", getAdministratorById);
router.delete("/:id", [authMiddeleware, checkAdmin], deleteAdministrator);
router.post("/addInstructor", [authMiddeleware, checkAdmin], createInstructor);
router.post(
  "/AddCorperateTrainee",
  [authMiddeleware, checkAdmin],
  createCorporateTrainee
);
router.put("/:id", [authMiddeleware, checkAdmin], updateAdministrator);
router.post(
  "/acceptCourseRequest",
  [authMiddeleware, checkAdmin],
  acceptCourseRequest
);
router.delete(
  "/deleteCourseRequest/:id",
  [authMiddeleware, checkAdmin],
  deleteCourseRequest
);
router.post(
  "/rejectCourseRequest",
  [authMiddeleware, checkAdmin],
  rejectCourseRequest
);

export default router;
