import { putBoundaryPagination } from "utils/pagination";
import { prisma } from "../../libs/prisma/constants";
import { generateFilterByTags } from "./tool-tags/utils";
import { mapperGetAllTools, mapperGetVerifiedTools } from "./tools-mappers";
import { tooltype } from "@prisma/client";
import { InferType } from "yup";
import { editToolSchema } from "./tools-schema";

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
  return mapperGetVerifiedTools({
    tools,
    total: totalTools,
  });
};

export const getToolByUrl = async (urlScrappedWeb: string) => {
  return await prisma.tools.findFirst({
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

export const editTool = async ({
  toolId,
  ...editDataTool
}: InferType<typeof editToolSchema> & { toolId: string }) => {
  const toolTags = await prisma.tool_Tags.findMany({
    where: { toolId },
  });

  const receivedTags = editDataTool.tags?.map((tag) => tag.id) || [];
  const tagsFromDatabase = toolTags.map((v) => v.tagId);
  const uniqTags = [...new Set([...receivedTags, ...tagsFromDatabase])];

  const actionPerTag = uniqTags.reduce<{ deleted: string[]; added: string[] }>(
    (prev, v) => {
      if (!receivedTags.includes(v) && tagsFromDatabase.includes(v)) {
        return { ...prev, deleted: [...prev.deleted, v] };
      }
      if (receivedTags.includes(v) && !tagsFromDatabase.includes(v)) {
        return { ...prev, added: [...prev.added, v] };
      }
      return prev;
    },
    {
      deleted: [],
      added: [],
    }
  );

  if (editDataTool.tags !== undefined) {
    await prisma.$transaction([
      prisma.tool_Tags.deleteMany({
        where: {
          OR: actionPerTag.deleted.map((tagId) => ({ tagId })),
          toolId,
        },
      }),
      prisma.tool_Tags.createMany({
        data: actionPerTag.added.map((tagId) => ({ toolId, tagId })),
      }),
    ]);
  }

  if (editDataTool.isVerified !== undefined) {
    await prisma.tools.update({
      where: {
        id: toolId,
      },
      data: {
        isVerified: editDataTool.isVerified,
      },
    });
  }
};

export const getToolById = async (toolId: string) => {
  const tool = await prisma.tools.findFirst({
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
      id: toolId,
    },
  });
  if (!tool) return;
  return {
    id: tool.id,
    url: tool.url,
    name: tool.name,
    type: tool.type,
    isVerified: tool.isVerified,
    tags: tool.Tool_Tags.map((v) => v.Tags),
  };
};
