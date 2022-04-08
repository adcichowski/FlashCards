import { Router } from "express";

import { subjectService } from "./subject.service";

import type { Request, Response } from "express";
// import { isAvaibleSubject } from "./subject.middleware";

const router = Router();
router.get("/subjects", async (_: Request, res: Response) => {
  const allSubjects = await subjectService.getSubjects();
  res.json({ data: allSubjects });
});
export { router as subjectRouter };
