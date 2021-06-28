import React from "react";
import { useForm } from "react-hook-form";
import { useGameContext } from "../../../../../Context/GameContext";
import { useMainContext } from "../../../../../Context/MainContext";
import { useSendData } from "../../../../../lib/firebase/Hooks";
import { inputValidation } from "../../../../../Utils/Utils";

export default function Personal() {
  const { setLoading, setModal } = useMainContext();
  const { currentUser } = useGameContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  console.log(currentUser);
  const { sendData } = useSendData();
  const onSubmit = ({ technology, question, answer }: any) => {
    try {
      setLoading(true);
      sendData(currentUser.idUser, technology, question, answer);
      setModal({
        isOpen: true,
        type: "success",
        message: "Great work! Yoy saved card!",
      });
      reset();
    } catch (e) {
      setModal({ isOpen: true, type: "error", message: e.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h1>Zalogowano</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("technology")} />
        <input
          {...register("question", inputValidation.question)}
          type="text"
        />
        <input {...register("answer", inputValidation.question)} type="text" />
        <button>Click to send</button>
      </form>
    </div>
  );
}
