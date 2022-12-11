import express from "express";
import {
  confirmPasswordReset,
  passwordReset,
  signin,
  signup,
} from "../controller/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/passwordReset", passwordReset);
router.post("/confirmPassword/:id", confirmPasswordReset);

export default router;
