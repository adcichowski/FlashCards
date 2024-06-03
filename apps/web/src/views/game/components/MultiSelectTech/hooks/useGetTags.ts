import { useQuery } from "@tanstack/react-query";
import { useFetch } from "src/hooks/useFetch";

export type QueryTagsData = {
  tags: {
    name: string;
    id: string;
  }[];
};

export function useGetTags() {
  const secureFetch = useFetch();
  const query = useQuery<QueryTagsData | undefined, { message: string }>({
    queryKey: ["getTags"],
    queryFn: async () => {
      if (secureFetch) {
        const articles = await secureFetch<QueryTagsData>(`tags`, {
          method: "GET",
        });
        return articles;
      }
    },
    enabled: Boolean(secureFetch),
  });
  return query;
}
