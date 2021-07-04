import { Router } from "express";
import auth from "./auth";
import admin from "./admin";
import web from "./web";
const router = Router();

router.use("/auth", auth);
router.use("/admin", admin);
router.use("/web", web);

export default router;
