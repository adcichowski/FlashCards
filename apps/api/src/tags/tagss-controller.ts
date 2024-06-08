import * as tagsService from "./tags-service";

import type { Response, Request } from "express";

export const getTags = async (_: Request, res: Response) => {
  const tags = await tagsService.getTags();
  return res.json({
    tags: tags.map(({ name, id }) => ({
      name,
      id,
    })),
  });
};
