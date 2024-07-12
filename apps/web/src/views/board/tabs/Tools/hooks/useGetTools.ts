import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useFetch } from "src/hooks/useFetch";
import { useGetSelectedTags } from "src/views/board/components/SearchByTags/hooks/useGetSelectedTags";

export type QueryToolsData = {
  tools: {
    url: string;
    icon?: string;
    description?: string;
    name: string;
    tags: { name: string; id: string }[];
    id: string;
    type: string;
    title: string;
    createdAt: number;
  }[];
  pages: number;
};

export function useGetTools() {
  const secureFetch = useFetch();
  const { selectedTags } = useGetSelectedTags();
  const page = Number(useSearchParams().get("page"));
  const query = useQuery<QueryToolsData | undefined, { message: string }>({
    queryKey: ["getTools", page, ...selectedTags],
    queryFn: async () => {
      if (secureFetch) {
        const tools = await secureFetch<QueryToolsData>(
          `tools?page=${page}&tags=${selectedTags.map((v) => v.name).join(",")}`,
          {
            method: "GET",
          },
        );
        return tools;
      }
    },
    enabled: Boolean(secureFetch),
  });
  return query;
}
