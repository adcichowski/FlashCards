import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useAuthContext } from "src/context/AuthContext";
import { useModalContext } from "src/context/ModalContext";
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

const MessagesForm = {
  login: "Great! You are log in.",
  register: "Great you are create a user!",
};

export function useAuthMutation({ typeForm }: { readonly typeForm: "login" | "register" }) {
  const endpointUrl = typeForm === "login" ? "sessions" : "users";
  const { setModal } = useModalContext();
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const mutation = useMutation(
    (data: LoginForm | RegisterForm) => axios.post<SuccessResponse>(`http://localhost:3003/${endpointUrl}`, data),
    {
      onError(error: AxiosError<ErrorResponse>) {
        const errorResponse = error.response?.data;
        setModal({ message: errorResponse?.message, type: "error", isOpen: true });
      },

      onSuccess: (response) => {
        const idUser = response.data.id;
        dispatch({ type: "logIn", setUser: { idUser } });
        setModal({ message: MessagesForm[typeForm], type: "success", isOpen: true });
        router.push("/game");
      },
    },
  );
  return mutation;
}
