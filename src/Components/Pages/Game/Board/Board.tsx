// import { useForm } from "react-hook-form";
// import { useGameContext } from "../../../../Context/GameContext";
// import { useMainContext } from "../../../../Context/MainContext";
// import { useSendData } from "../../../../lib/firebase/Hooks";
// import { inputValidation } from "../../../../Utils/Utils";

// export default function Board() {
//   const { setLoading, setModal } = useMainContext();
//   const { currentUser } = useGameContext();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   console.log(currentUser);
//   const { sendData } = useSendData();
//   const onSubmit = ({ technology, question, answer }: any) => {
//     try {
//       setLoading(true);
//       sendData("General", technology, question, answer);
//       reset();
//     } catch (e) {
//       setModal({ isOpen: true, type: "error", message: e.message });
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div>
//       <h1>Zalogowano</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input {...register("technology")} />
//         <input
//           {...register("question", inputValidation.question)}
//           type="text"
//         />
//         <input {...register("answer", inputValidation.question)} type="text" />
//         <button>Click to send</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import General from "./General/General";
import Personal from "./Personal/Personal";

export default function Board() {
  //@ts-ignore
  const [Board, setBoard] = useState("");
  const handleClick = (board: string) => {
    setBoard(board);
  };
  switch (Board) {
    case "Personal":
      return <Personal />;
    case "General":
      return <General />;
    default:
      return (
        <div>
          <button type="button" onClick={() => handleClick("Personal")}>
            Personal Cards
          </button>
          <button onClick={() => setBoard("General")}>General Cards</button>
        </div>
      );
  }
}
