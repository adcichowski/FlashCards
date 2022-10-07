// import { useRouter } from "next/router";
import { useMutation } from "react-query";
// import { useAuthContext } from "src/context/AuthContext";
import { useModalContext } from "src/context/ModalContext";
import { fetcher } from "src/utils/fetcher";
export type LoginForm = {
  readonly email: string;
  readonly password: string;
};

export type RegisterForm = {
  readonly username: string;
  readonly email: string;
  readonly password: string;
};

export type SuccessResponse = {
  readonly id: string;
};
export type ErrorResponse = {
  readonly message: string;
  readonly code: string;
};

// const MessagesForm = {
//   login: "Great! You are log in.",
//   register: "Great you are create a user!",
// };

export function useAuthMutation({ typeForm }: { readonly typeForm: "login" | "register" }) {
  const endpoint = typeForm === "login" ? "sessions" : "users";
  const { openModal } = useModalContext();
  // const { dispatch } = useAuthContext();
  // const router = useRouter();
  const mutation = useMutation(
    async (body: LoginForm | RegisterForm) => {
      return await fetcher<{ readonly id: string } | ErrorResponse>({
        method: "POST",
        body,
        endpoint,
      });
    },
    {
      onError(error: ErrorResponse) {
        return openModal({ message: error.message, type: "error" });
      },

      onSuccess: (response) => {
        console.log(response);
        if ("message" in response) {
          openModal({ message: response.message, type: "error" });
        }
        // dispatch({ type: "logIn", setUser: { idUser: response.id } });
        // openModal({ message: MessagesForm[typeForm], type: "success" });
        // router.push("/game");
      },
    },
  );
  return mutation;
}
