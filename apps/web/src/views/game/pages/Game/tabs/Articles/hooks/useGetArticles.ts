import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useFetch } from "src/hooks/useFetch";

export type QueryArticleData = {
  articles:{
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
}[],
pages:number,
}

export function useGetArticles() {
  const secureFetch = useFetch();
  const page = Number(useSearchParams().get("page"));
  const query = useQuery<QueryArticleData | undefined, { message: string }>({
    queryKey: ["getArticles", page],
    queryFn: async () => {
      if (secureFetch) {
        const articles = await secureFetch<QueryArticleData>(`articles?page=${page}`, {
          method: "GET",
        });
        return articles;
      }
    },
    enabled: Boolean(secureFetch),
  });
  return query;
}
