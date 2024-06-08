import { useMutation } from "@tanstack/react-query";
import { client } from "src/components/Providers/Providers";
import { useFetch } from "src/hooks/useFetch";

type MutationSaveArticleVariables = {
  url: string;
};

type MutationSaveArticleData = {
  id: string;
  url: string;
  title: string;
  heading: string;
  createdAt: number | undefined;
  author: string | undefined;
  tags: string[] | undefined;
  faviconUrl: string | undefined;
};
export function useSaveArticle() {
  const secureFetch = useFetch();
  const mutation = useMutation<MutationSaveArticleData | undefined, { message: string }, MutationSaveArticleVariables>({
    mutationKey: ["saveArticle"],
    mutationFn: async (data) => {
      if (secureFetch) {
        const res = await secureFetch<MutationSaveArticleData>("articles", {
          method: "POST",
          body: data,
        });
        return res;
      }
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ["getArticles"] }),
  });
  return mutation;
}
