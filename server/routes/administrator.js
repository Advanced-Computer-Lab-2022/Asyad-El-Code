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
  provideCourse,
  getRefunds,
  refundCourse,
  acceptRefund,
  rejectRefund,
  deleteRefundRequest,
} from "../controller/administrator.js";

const router = express.Router();

router.get("/refunds", getRefunds);
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
router.post("/provideCourse", provideCourse);
router.post("/refundCourse", refundCourse);
router.post("/acceptRefund", acceptRefund);
router.post("/rejectRefund", rejectRefund);
router.delete("/deleteRefundRequest/:id", deleteRefundRequest);

export default router;
