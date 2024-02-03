import { sectionsService } from "./sections-service";

import type { Response, Request } from "express";

export const getSections = async (_: Request, res: Response) => {
  const sections = await sectionsService.getSections();
  return res.json(
    sections.map(({ name, id }) => ({
      name,
      id,
    }))
  );
};
