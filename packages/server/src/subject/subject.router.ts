import { Router } from "express";
import { isAvaibleSubject } from "./subject.middleware";
import { subjectService } from "./subject.service";

const router = Router();
router.get("/subjects", isAvaibleSubject, subjectService.getSubjects);
export { router as subjectRouter };
