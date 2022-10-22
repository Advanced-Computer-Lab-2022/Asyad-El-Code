import express from "express";
import { createAdministrator,getAdministrators, getAdministrator } from "../controller/administrator.js";
const router = express.Router();

router.post("/",createAdministrator);
router.get("/",getAdministrators);
router.get("/:userName",getAdministrator);




export default router;
