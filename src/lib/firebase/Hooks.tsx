import { db } from "./index";
//@ts-ignore
export function useSendData() {
  function sendData(
    Database: string,
    Technology: string,
    Question: string,
    Answer: string
  ) {
    db.collection(Database).add({
      Technology,
      Question,
      Answer,
    });
  }
  function getData() {}
  return { sendData, getData };
}
