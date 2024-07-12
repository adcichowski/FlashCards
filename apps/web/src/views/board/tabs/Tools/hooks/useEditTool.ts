import { useMutation } from "@tanstack/react-query";
import { client } from "src/components/Providers/Providers";
import { useFetch } from "src/hooks/useFetch";

type MutationSaveArticleVariables = {
  name: string;
  type: string;
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

export function useEditTool({ toolId }: { toolId?: string }) {
  const secureFetch = useFetch();

  const mutation = useMutation<MutationSaveArticleData | undefined, { message: string }, MutationSaveArticleVariables>({
    mutationKey: ["editTool", toolId],
    mutationFn: async (data) => {
      if (secureFetch) {
        const res = await secureFetch<MutationSaveArticleData>(`tools/${toolId}`, {
          method: "PUT",
          body: data,
        });
        return res;
      }
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ["getTools"] }),
  });
  return mutation;
}
