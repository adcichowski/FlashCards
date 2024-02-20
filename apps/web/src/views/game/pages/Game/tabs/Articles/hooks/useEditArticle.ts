import { useMutation } from "@tanstack/react-query";
import { fetcher } from "src/utils/fetcher";

type MutationSaveArticleVariables = {
  title: string;
  author?: string;
  imageSrc: string;
};

type MutationSaveArticleData = {
  id: string;
  title: string;
  author?: string;
  imageSrc: string;
};

export function useEditArticle() {
  const mutation = useMutation<MutationSaveArticleData, { message: string }, MutationSaveArticleVariables>({
    mutationKey: ["saveArticle"],
    mutationFn: async (data) => {
      const res = await fetcher<MutationSaveArticleData>("articles", {
        method: "PUT",
        body: data,
      });
      return res;
    },
  });
  return mutation;
}
