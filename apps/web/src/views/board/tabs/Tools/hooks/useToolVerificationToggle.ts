import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { client } from "src/components/Providers/Providers";
import { useFetch } from "src/hooks/useFetch";
import { useGetSelectedTags } from "src/views/board/components/SearchByTags/hooks/useGetSelectedTags";

type MutationSaveArticleVariables = { toolId?: string; isVerified?: boolean };
type MutationSaveArticleData = {
  id: string;
  title: string;
  author?: string;
  createdAt?: string;
  tags?: { name: string; id: string }[];
};

export function useToolVerificationToggle() {
  const secureFetch = useFetch();
  const { selectedTags } = useGetSelectedTags();
  const page = Number(useSearchParams().get("page"));
  const mutation = useMutation<MutationSaveArticleData | undefined, { message: string }, MutationSaveArticleVariables>({
    mutationKey: ["verifyTool"],
    mutationFn: async (variables) => {
      if (secureFetch && variables.isVerified !== undefined) {
        const res = await secureFetch<MutationSaveArticleData>(`tools/${variables.toolId}`, {
          method: "PUT",
          body: { isVerified: !variables.isVerified },
        });
        return res;
      }
    },
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: ["getTools", page, ...selectedTags] });
      client.invalidateQueries({ queryKey: ["getTool", variables.toolId] });
    },
  });
  return mutation;
}
