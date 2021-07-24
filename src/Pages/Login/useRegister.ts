import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAuthContext } from "../../Context/AuthContext";
import { useMainContext } from "../../Context/MainContext";
import { auth } from "../../lib/firebase";
import { UserData } from "../../Types";

export default function useRegister() {
  const history = useHistory();
  const { dispatch } = useMainContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { dispatch: AuthDispatch } = useAuthContext();
  const onSubmit = async ({ email, password }: UserData) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      if (!auth?.currentUser?.uid) {
        throw Error("This account not exist!");
      }
      AuthDispatch({
        type: "logIn",
        setUser: {
          idUser: auth?.currentUser?.uid,
        },
      });
      dispatch({
        type: "openModal",
        setModal: {
          type: "success",
          message: "Your are register in webiste!",
        },
      });
      history.push("/game");
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
  return { onSubmit, register, errors, handleSubmit };
}
