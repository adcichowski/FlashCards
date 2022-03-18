import { Router } from "express";
import { getAllSubject } from "./subject.controler";

const router = Router();
router.get("/", getAllSubject);
export { router as subjectRouter };
