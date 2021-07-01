import { useForm } from "react-hook-form";
import { useGameContext } from "../../../../../Context/GameContext";
import { useMainContext } from "../../../../../Context/MainContext";
import { useSendData } from "../../../../../lib/firebase/Hooks";
import { inputValidation } from "../../../../../Utils/Utils";

export default function Personal() {
  const { dispatch } = useMainContext();
  const { state } = useGameContext();
  const { register, handleSubmit, reset } = useForm();
  const { sendData } = useSendData();
  const onSubmit = ({ technology, question, answer }: any) => {
    try {
      sendData(state.idUser, technology, question, answer);
      dispatch({
        type: "openModal",
        setModal: {
          type: "success",
          message: "Great Work!",
        },
      });
      reset();
    } catch (e) {
      dispatch({ type: "closeModal" });
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
