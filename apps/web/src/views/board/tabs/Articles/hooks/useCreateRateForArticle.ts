import { useMutation } from "@tanstack/react-query";
import { client } from "src/components/Providers/Providers";
import { useFetch } from "src/hooks/useFetch";
import { fetcher } from "src/utils/fetcher";

type MutationCreateRateForArticleData = {
  rate: number;
  articleId: string;
};

type MutationCreateRateForArticleVariables = {
  rateId: string;
};

export function useCreateRateForArticle() {
  const secureFetch = useFetch();
  const mutation = useMutation<
    MutationCreateRateForArticleVariables | undefined,
    { message: string },
    MutationCreateRateForArticleData
  >({
    mutationKey: ["createRateForArticle"],
    mutationFn: async (data) => {
      if (secureFetch) {
        const res = await secureFetch<MutationCreateRateForArticleVariables>(`articles/${data.articleId}/rates`, {
          method: "POST",
          body: data,
        });
        return res;
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["getArticles"] });
    },
  });
  return mutation;
}
