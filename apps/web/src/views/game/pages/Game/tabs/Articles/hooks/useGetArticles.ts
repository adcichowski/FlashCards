import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useFetch } from "src/hooks/useFetch";
import { useGetSelectedTags } from "src/views/game/components/MultiSelectTech/hooks/useGetSelectedTags";

export type QueryArticleData = {
  articles: {
    tags: { name: string; id: string }[];
    id: string;
    author: string;
    url: string;
    faviconUrl: string;
    title: string;
    rate: {
      sum: number;
    };
    yourRated: {
      rate: number;
      id: string;
    };
    createdAt: number;
  }[];
  pages: number;
};

export function useGetArticles() {
  const secureFetch = useFetch();
  const { selectedTags } = useGetSelectedTags();
  const page = Number(useSearchParams().get("page"));
  const query = useQuery<QueryArticleData | undefined, { message: string }>({
    queryKey: ["getArticles", page, ...selectedTags],
    queryFn: async () => {
      if (secureFetch) {
        const articles = await secureFetch<QueryArticleData>(
          `articles?page=${page}&tags=${selectedTags.map((v) => v.name).join(",")}`,
          {
            method: "GET",
          },
        );
        return articles;
      }
    },
    enabled: Boolean(secureFetch),
  });
  return query;
}
