import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useFetch } from "src/hooks/useFetch";
import { useGetSelectedTags } from "src/views/board/components/SearchByTags/hooks/useGetSelectedTags";

export type QueryArticleData = {
  article: {
    tags: { name: string; id: string }[];
    id: string;
    author: string;
    url: string;
    faviconUrl: string;
    title: string;
  };
};

export function useGetArticle({ id }: { id?: string }) {
  const secureFetch = useFetch();
  const query = useQuery<QueryArticleData | undefined, { message: string }>({
    queryKey: ["getArticle", id],
    queryFn: async () => {
      if (secureFetch) {
        const articles = await secureFetch<QueryArticleData>(`articles/${id}`, {
          method: "GET",
        });
        return articles;
      }
    },
    enabled: Boolean(secureFetch) && Boolean(id),
  });
  return query;
}
