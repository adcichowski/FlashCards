import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { client } from "src/components/Providers/Providers";
import { useFetch } from "src/hooks/useFetch";

export type DeleteArticleData = {
  message: string;
};

export function useDeleteArticle() {
  const secureFetch = useFetch();
  const mutation = useMutation<DeleteArticleData | undefined, { message: string }, { articleId: string }>({
    mutationKey: ["deleteArticle"],
    mutationFn: async ({ articleId }: { articleId: string }) => {
      if (secureFetch) {
        const articles = await secureFetch<DeleteArticleData>(`articles/${articleId}`, {
          method: "DELETE",
        });
        return articles;
      }
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ["getArticles"] }),
  });
  return mutation;
}
