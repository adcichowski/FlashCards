import { putBoundaryPagination } from "utils/pagination";
import { prisma } from "../../libs/prisma/constants";
import { generateFilterByTags } from "./tool-tags/utils";
import { mapperGetAllTools } from "./tools-mappers";

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
