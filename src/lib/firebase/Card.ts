import { ICard, PersonRating } from "../../Types/Types";
class Card implements ICard {
  technology: string;
  id: number;
  answer: string;
  rating: number;
  question: string;
  isFavorite: boolean;
  whoRate: PersonRating[];
  constructor({ technology, id, answer, question, isFavorite }: ICard) {
    this.technology = technology;
    this.answer = answer;
    this.id = id;
    this.question = question;
    this.rating = 0;
    this.isFavorite = isFavorite;
    this.whoRate = [];
  }

  validateFields() {
    if (this.technology === "none") throw Error("Set technology in card");
    if (this.answer === "") throw Error("Answer field is empty!");
    if (this.question === "") throw Error("Question field is empty!");
    if (this.id === 0) throw Error("Select card deck");
  }
}

export const useCreateCard = () => {
  const createCard = (card: ICard) => new Card({ ...card });
  return createCard;
};
