import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { auth } from "../../lib/firebase/Settings";
import { useAuthContext } from "../../Context/AuthContext";
import { useModalContext } from "../../Context/ModalContext";
import { UserData } from "../../Types/Types";
import React from "react";
import { doActionWithEmailPass } from "../../lib/firebase/Utils";
import { changeMessageFromFirebase } from "../../Utils/Utils";

function useFormLoginRegister({ type }: { type: "login" | "register" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const { dispatch } = useModalContext();
  const { dispatch: authDispatch, state } = useAuthContext();
  const onSubmit = React.useCallback(
    () =>
      async ({ email, password }: UserData) => {
        try {
          await doActionWithEmailPass(type, email, password);
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
              message: `You are ${type} in website`,
            },
          });
          history.push("/game");
        } catch (err) {
          if (err instanceof Error) {
            dispatch({
              type: "errorModal",
              setModal: {
                message: changeMessageFromFirebase(err.message),
              },
            });
          }
        }
      },
    [authDispatch, dispatch, history, type, state],
  );

  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
  };
}
export { useFormLoginRegister };
