import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { auth } from "../../Lib/firebase/Settings";
import { useAuthContext } from "../../Context/AuthContext";
import { useModalContext } from "../../Context/ModalContext";
import { UserData } from "../../Types/Types";
import { useState } from "react";
import React from "react";
import { doActionWithEmailPass } from "../../Lib/firebase/Utils";
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
  const { dispatch } = useModalContext();
  const { dispatch: authDispatch, state } = useAuthContext();
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
          setUser: { ...state, idUser: auth?.currentUser?.uid },
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
    [authDispatch, dispatch, history, typeOfAction, state]
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
