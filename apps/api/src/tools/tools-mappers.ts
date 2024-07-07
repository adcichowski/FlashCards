import { tooltype } from "@prisma/client";
import { generatePagination } from "utils/pagination";
type MapperGetAllParams = {
  tools: ({
    icon: string | null;
    type: tooltype | null;
    Tool_Tags: ({
      Tags: {
        id: string;
        name: string;
      };
    } & {
      id: string;
      toolId: string;
      tagId: string;
    })[];
  } & {
    id: string;
    name: string | null;
    description: string | null;
  })[];
  total: number;
};

export const mapperGetAllTools = ({ tools, total }: MapperGetAllParams) => {
  const mappedTools = tools.map((v) => ({
    name: v.name,
    id: v.id,
    description: v.description,
    type: v.type,
    icon: v.icon,
    tags: v.Tool_Tags.map((v) => v.Tags),
  }));
  return { tools: mappedTools, ...generatePagination(total) };
};
