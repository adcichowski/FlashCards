import { useMutation } from "@tanstack/react-query";
import { client } from "src/components/Providers/Providers";
import { useFetch } from "src/hooks/useFetch";
import { fetcher } from "src/utils/fetcher";

type MutationSaveArticleVariables = {
  title: string;
  author?: string;
  createdAt?: string;
  tags?: { name: string; id: string }[];
};

type MutationSaveArticleData = {
  id: string;
  title: string;
  author?: string;
  createdAt?: string;
  tags?: { name: string; id: string }[];
};

export function useEditArticle({ articleId }: { articleId?: string }) {
  const secureFetch = useFetch();

  const mutation = useMutation<MutationSaveArticleData | undefined, { message: string }, MutationSaveArticleVariables>({
    mutationKey: ["editArticle", articleId],
    mutationFn: async (data) => {
      if (secureFetch) {
        const res = await secureFetch<MutationSaveArticleData>(`articles/${articleId}`, {
          method: "PUT",
          body: data,
        });
        return res;
      }
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ["getArticles"] }),
  });
  return mutation;
}
