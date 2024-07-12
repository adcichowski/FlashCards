import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useFetch } from "src/hooks/useFetch";
import { useGetSelectedTags } from "src/views/board/components/SearchByTags/hooks/useGetSelectedTags";

export type QueryToolData = {
  tool: {
    tags: { name: string; id: string }[];
    type: string;
  };
};

export function useGetTool({ id }: { id?: string }) {
  const secureFetch = useFetch();
  const query = useQuery<QueryToolData | undefined, { message: string }>({
    queryKey: ["getTool", id],
    queryFn: async () => {
      if (secureFetch) {
        const tool = await secureFetch<QueryToolData>(`tools/${id}`, {
          method: "GET",
        });
        return tool;
      }
    },
    enabled: Boolean(secureFetch) && Boolean(id),
  });
  return query;
}
