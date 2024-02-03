import { Router } from "express";
import { getSections } from "./sections-controller";

// import { isAvaibleSubject } from "./subject.middleware";

const router = Router();
router.get("/sections", getSections);
export { router as sectionsRouter };
