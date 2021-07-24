import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { auth } from "../../lib/firebase/index";
import { useAuthContext } from "../../Context/AuthContext";
import { useMainContext } from "../../Context/MainContext";
import { UserData } from "../../Types";
import { useState } from "react";
import { funcAuthFirebase } from "../../lib/firebase/Utils";

export default function useFormLoginRegister() {
  const [isRegisterAction, setRegisterAction] = useState(true);
  const handleClickRegister = () => setRegisterAction(!isRegisterAction);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { typeAuth } = funcAuthFirebase();
  const history = useHistory();
  const { dispatch } = useMainContext();
  const { dispatch: authDispatch } = useAuthContext();
  const onSubmit = async ({ email, password }: UserData) => {
    try {
      await typeAuth("login", email, password);
      if (!auth?.currentUser?.uid) {
        throw Error("This account not exist!");
      }
      authDispatch({
        type: "logIn",
        setUser: { idUser: auth?.currentUser?.uid },
      });
      dispatch({
        type: "successModal",
        setModal: {
          message: isRegisterAction
            ? "You are login in webiste!"
            : "You are register in website!",
        },
      });
      history.push("/game");
    } catch (e) {
      dispatch({
        type: "errorModal",
        setModal: {
          message: e.message,
        },
      });
    }
  };
  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
    isRegisterAction,
    handleClickRegister,
  };
}
