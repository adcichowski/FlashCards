import { putBoundaryPagination } from "utils/pagination";
import { prisma } from "../../libs/prisma/constants";
import { generateFilterByTags } from "./tool-tags/utils";
import { mapperGetAllTools } from "./tools-mappers";
import { tooltype } from "@prisma/client";

export const getAllTools = async ({
  page,
  tags,
}: {
  verified?: boolean;
  page: string | undefined;
  tags: string[] | undefined;
}) => {
  const [tools, totalTools] = await prisma.$transaction([
    prisma.tools.findMany({
      ...putBoundaryPagination(page),

      include: {
        Tool_Tags: {
          include: {
            Tags: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: generateFilterByTags(tags),
    }),
    prisma.tools.count({
      where: generateFilterByTags(tags),
    }),
  ]);
  return mapperGetAllTools({
    tools,
    total: totalTools,
  });
};

export const getVerifiedTools = async ({
  page,
  tags,
}: {
  verified?: boolean;
  page: string | undefined;
  tags: string[] | undefined;
}) => {
  const [tools, totalTools] = await prisma.$transaction([
    prisma.tools.findMany({
      ...putBoundaryPagination(page),
      include: {
        Tool_Tags: {
          include: {
            Tags: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: {
        ...generateFilterByTags(tags),
        isVerified: true,
      },
    }),
    prisma.tools.count({
      where: {
        ...generateFilterByTags(tags),
        isVerified: true,
      },
    }),
  ]);
  return mapperGetAllTools({
    tools,
    total: totalTools,
  });
};

export const getToolByUrl = async (urlScrappedWeb: string) => {
  return await prisma.articles.findFirst({
    where: {
      url: urlScrappedWeb,
    },
  });
};

export const createTool = async ({
  name,
  url,
  icon,
  description,
  tags,
  type,
}: {
  url: string;
  description: string;
  name: string;
  type: tooltype;
  icon: string | undefined;
  tags: { id: string; name: string }[] | undefined;
}) => {
  return await prisma.tools.create({
    data: {
      name,
      url,
      icon,
      type,
      description,
      Tool_Tags: {
        createMany: {
          data: tags ? tags.map((v) => ({ tagId: v.id })) : [],
        },
      },
    },
  });
};
