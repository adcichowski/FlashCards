import { useMutation } from "react-query";
export type LoginForm = {
  readonly email: string;
  readonly password: string;
};
export type RegisterForm = {
  readonly username: string;
  readonly email: string;
  readonly password: string;
};
export function useAuthMutation({ typeForm }: { readonly typeForm: "login" | "register" }) {
  const endpointUrl = typeForm === "login" ? "sessions" : "users";
  const mutation = useMutation(
    async (data: LoginForm | RegisterForm) => {
      return await fetch(`http://localhost:3003/${endpointUrl}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    {
      onSuccess: async (data) => console.log(await data.json(), "Success"),
    },
  );
  return mutation;
}
