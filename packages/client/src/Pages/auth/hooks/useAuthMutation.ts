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
  const mutation = useMutation((data: LoginForm | RegisterForm) => {
    return fetch(`http://localhost:3003/${endpointUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  });

  return mutation;
}
