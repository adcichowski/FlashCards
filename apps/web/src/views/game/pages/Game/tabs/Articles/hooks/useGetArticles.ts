import { useQuery } from "@tanstack/react-query";
import { fetcher } from "src/utils/fetcher";

export type QueryArticleData = {
  id: string;
  author: string;
  url: string;
  imageSrc: string;
  title: string;
};

export function useGetArticles() {
  const query = useQuery<{ articles: QueryArticleData[] }, { message: string }>({
    queryKey: ["getArticles"],
    queryFn: async () => {
      const articles = fetcher<{ articles: QueryArticleData[] }>("articles", { method: "GET" });
      return articles;
    },
  });
  return query;
}
