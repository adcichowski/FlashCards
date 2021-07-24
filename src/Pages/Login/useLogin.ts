import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { auth } from "../../lib/firebase/index";
import { useAuthContext } from "../../Context/AuthContext";
import { useMainContext } from "../../Context/MainContext";
import { UserData } from "../../Types";

export default function useLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const history = useHistory();
  const { dispatch } = useMainContext();
  const { dispatch: authDispatch } = useAuthContext();
  const onSubmit = async ({ email, password }: UserData) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      if (!auth?.currentUser?.uid) {
        throw Error("This account not exist!");
      }
      authDispatch({
        type: "logIn",
        setUser: { idUser: auth?.currentUser?.uid },
      });
      dispatch({
        type: "openModal",
        setModal: {
          type: "success",
          message: "You are login in webiste!",
        },
      });
      history.push("/game");
      reset();
    } catch (e) {
      dispatch({
        type: "openModal",
        setModal: {
          type: "error",
          message: e.message,
        },
      });
    }
  };
  return { onSubmit, handleSubmit, register, errors };
}
