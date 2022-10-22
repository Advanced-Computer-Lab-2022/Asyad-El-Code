import express from "express";
import { createAdministrator,getAdministrators, getAdministrator,deleteAdministrator } from "../controller/administrator.js";
const router = express.Router();

router.post("/",createAdministrator);
router.get("/",getAdministrators);
router.get("/:userName",getAdministrator);
router.delete("/",deleteAdministrator);




export default router;
