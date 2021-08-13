import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { auth } from "../../lib/firebase/Settings";
import { useAuthContext } from "../../Context/AuthContext";
import { useMainContext } from "../../Context/MainContext";
import { UserData } from "../../Types/Types";
import { useState } from "react";
import React from "react";
import { doActionWithEmailPass } from "../../lib/firebase/Utils";
import { changeMessageFromFirebase } from "../../Utils/Utils";

function useFormLoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  const handleClickRegister = React.useCallback(
    () => setIsRegister(!isRegister),
    [isRegister]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const { dispatch } = useMainContext();
  const { dispatch: authDispatch } = useAuthContext();
  const typeOfAction = isRegister ? "register" : "login";
  const onSubmit = React.useCallback(
    async ({ email, password }: UserData) => {
      try {
        await doActionWithEmailPass(typeOfAction, email, password);
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
            message: `You are ${typeOfAction} in website`,
          },
        });
        history.push("/game");
      } catch ({ message }) {
        dispatch({
          type: "errorModal",
          setModal: {
            message: changeMessageFromFirebase(message),
          },
        });
      }
    },
    [authDispatch, dispatch, history, typeOfAction]
  );

  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
    isRegister,
    handleClickRegister,
  };
}
export { useFormLoginRegister };
