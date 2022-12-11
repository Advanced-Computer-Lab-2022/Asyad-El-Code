import express from "express";
import {
  confirmPasswordReset,
  sendEmail,
  signin,
  signup,
} from "../controller/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/sendEmail", sendEmail);
router.post("/confirmPassword/:id", confirmPasswordReset);

export default router;
