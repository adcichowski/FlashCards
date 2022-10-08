import { Router } from "express";

import { getAllSubjects } from "./subject-controller";

// import { isAvaibleSubject } from "./subject.middleware";

const router = Router();
router.get("/subjects", getAllSubjects);
export { router as subjectRouter };
