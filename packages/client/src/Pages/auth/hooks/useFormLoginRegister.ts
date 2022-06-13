import { useForm } from "react-hook-form";

import { useAuthContext } from "../../../context/AuthContext";
import { useModalContext } from "../../../context/ModalContext";
import React from "react";
import { changeMessageFromFirebase } from "../../../utils/Utils";
import { useRouter } from "next/router";

function useFormLoginRegister({ type }: { readonly type: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ readonly email: string; readonly password: string; readonly username: string }>();
  const history = useRouter();
  const { dispatch } = useModalContext();
  const { dispatch: authDispatch, state } = useAuthContext();
  const onSubmit = React.useCallback(() => {
    try {
      authDispatch({
        type: "logIn",
        setUser: { ...state },
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
  }, [authDispatch, dispatch, history, type, state]);

  return {
    onSubmit,
    handleSubmit,
    register,
    errors,
  };
}
export { useFormLoginRegister };
