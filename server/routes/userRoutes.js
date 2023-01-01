import express from "express";
import {
  confirmPasswordReset,
  sendEmail,
  signin,
  signup,
  getLoggedUser,
} from "../controller/auth.js";
import { firstLogin } from "../controller/instructor.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/sendEmail", sendEmail);
router.post("/confirmPassword/:id", confirmPasswordReset);
router.get("/getLoggedUser", getLoggedUser);
router.patch("/instructor/firstLogin/:id", firstLogin);

export default router;
