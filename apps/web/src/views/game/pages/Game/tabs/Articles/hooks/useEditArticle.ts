import { useMutation } from "@tanstack/react-query";
import { client } from "src/components/Providers/Providers";
import { fetcher } from "src/utils/fetcher";

type MutationSaveArticleVariables = {
  title: string;
  author?: string;
  createdAt?: string;
  tags?: string[];
};

type MutationSaveArticleData = {
  id: string;
  title: string;
  author?: string;
  createdAt?: string;
  tags?: string[];
};

export function useEditArticle({ articleId }: { articleId: string }) {
  const mutation = useMutation<MutationSaveArticleData, { message: string }, MutationSaveArticleVariables>({
    mutationKey: ["editArticle", articleId],
    mutationFn: async (data) => {
      const res = await fetcher<MutationSaveArticleData>("articles", {
        method: "PUT",
        body: data,
      });
      return res;
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ["getArticles"] }),
  });
  return mutation;
}
