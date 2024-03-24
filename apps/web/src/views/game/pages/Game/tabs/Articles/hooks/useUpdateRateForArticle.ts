import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "src/components/Providers/Providers";
import { useFetch } from "src/hooks/useFetch";
import { fetcher } from "src/utils/fetcher";

type MutationUpdateRateForArticleVariables = {
  rate: number;
  rateId: string;
  articleId: string;
};

export function useUpdateRateForArticle() {
  const secureFetch = useFetch();
  const mutation = useMutation({
    mutationKey: ["updateRateForArticle"],
    mutationFn: async (data: MutationUpdateRateForArticleVariables) => {
      if (secureFetch) {
        const res = await secureFetch<MutationUpdateRateForArticleVariables>(
          `articles/${data.articleId}/rates/${data.rateId}`,
          {
            method: "PUT",
            body: data,
          },
        );
        return res;
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["getArticles"] });
    },
  });
  return mutation;
}
