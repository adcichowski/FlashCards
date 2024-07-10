import { useMutation } from "@tanstack/react-query";
import { client } from "src/components/Providers/Providers";
import { useFetch } from "src/hooks/useFetch";

type MutationAddToolVariables = {
  url: string;
};

export type MutationAddToolData = {
  id: string;
  url: string;
  name: string;
  tags: { name: string; id: string }[] | undefined;
  icon: string | undefined;
};
export function useAddTool() {
  const secureFetch = useFetch();
  const mutation = useMutation<MutationAddToolData | undefined, { message: string }, MutationAddToolVariables>({
    mutationKey: ["addTool"],
    mutationFn: async (data) => {
      if (secureFetch) {
        const res = await secureFetch<MutationAddToolData>("tools", {
          method: "POST",
          body: data,
        });
        return res;
      }
    },
    onSuccess: () => client.invalidateQueries({ queryKey: ["getTools"] }),
  });
  return mutation;
}
