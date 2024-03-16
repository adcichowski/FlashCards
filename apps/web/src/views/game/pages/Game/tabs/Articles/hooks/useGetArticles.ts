import { useQuery } from "@tanstack/react-query";
import { useFetch } from "src/hooks/useFetch";
import { fetcher } from "src/utils/fetcher";

export type QueryArticleData = {
  id: string;
  author: string;
  url: string;
  imageSrc: string;
  title: string;
  rate: {
    sum: number;
  };
  yourRated: {
    rate: number;
    id: string;
  };
  createdAt: number;
};

export function useGetArticles() {
  const secureFetch = useFetch();
  const query = useQuery<{ articles: QueryArticleData[] } | undefined, { message: string }>({
    queryKey: ["getArticles"],
    queryFn: async () => {
      if (secureFetch) {
        const articles = await secureFetch<{ articles: QueryArticleData[] }>("articles", { method: "GET" });
        return articles;
      }
    },
    enabled: Boolean(secureFetch),
  });
  return query;
}
