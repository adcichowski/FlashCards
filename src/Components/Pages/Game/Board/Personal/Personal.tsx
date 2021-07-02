import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../../../Context/AuthContext";
import { useGameContext } from "../../../../../Context/GameContext";
import { useMainContext } from "../../../../../Context/MainContext";
import { dataFirestore } from "../../../../../lib/firebase/Utils";
import { inputValidation } from "../../../../../Utils/Utils";

export default function Personal() {
  const { dispatch } = useMainContext();
  const {
    dispatch: gameDispatch,
    state: { personalCards },
  } = useGameContext();
  const { state } = useAuthContext();
  const { register, handleSubmit, reset } = useForm();
  const { sendData, getData } = dataFirestore(state.idUser);
  useEffect(() => {
    try {
      getData().then((data) => {
        console.log(data, "data");
        gameDispatch({
          type: "setData",
          setData: {
            personalCards: data,
          },
        });
      });
    } catch (e) {
      dispatch({
        type: "openModal",
        setModal: {
          type: "error",
          message: e.message,
        },
      });
    }
    console.log("hi");
  }, []);
  const onSubmit = ({ technology, question, answer }: any) => {
    try {
      sendData(technology, question, answer, false);
      dispatch({
        type: "openModal",
        setModal: {
          type: "success",
          message: "You are send a flashcard!",
        },
      });
      reset();
    } catch (e) {
      dispatch({ type: "closeModal" });
    }
  };
  return (
    <div>
      <button>Create Card</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("technology")} />
        <input
          {...register("question", inputValidation.question)}
          type="text"
        />
        <input {...register("answer", inputValidation.question)} type="text" />
        <button>Click to send</button>
      </form>
      {personalCards.map((card: any) => (
        <div key={card.Technology}>
          <h1>{card?.Technology}</h1>
        </div>
      ))}
    </div>
  );
}
