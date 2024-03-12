import { useMutation } from "@tanstack/react-query";
import { fetcher } from "src/utils/fetcher";

type MutationSaveArticleVariables = {
  url: string;
};

type MutationSaveArticleData = {
  id: string;
  url: string;
  title: string;
  createdAt: number | undefined;
  author: string | undefined;
  tags: string[] | undefined;
};
export function useSaveArticle() {
  const mutation = useMutation<MutationSaveArticleData, { message: string }, MutationSaveArticleVariables>({
    mutationKey: ["saveArticle"],
    mutationFn: async (data) => {
      const res = await fetcher<MutationSaveArticleData>("articles", {
        method: "POST",
        body: data,
      });
      return res;
    },
  });
  return mutation;
}
