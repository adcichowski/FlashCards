import { ICard, PersonRating } from "../Types/Types";

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const inputValidation = {
  email: {
    required: { value: true, message: "Email is empty." },
    pattern: {
      value: EMAIL_REGEX,
      message: "Email address field is empty or has an invalid format.",
    },
  },
  password: {
    required: { value: true, message: "Password is empty." },
    pattern: {
      value: PASSWORD_REGEX,
      message:
        "Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  },
  answer: {
    required: { value: true, message: "Answer is empty." },
  },
  question: {
    required: { value: true, message: "Question is empty." },
  },
};

export function getRandomMinMax(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function capitalize(txt: string) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}
export function validateInputOnlyNumbers(input: string) {
  return /^\d+$/.test(input);
}
export function changeMessageFromFirebase(message: string) {
  const messageFromRegex = message.match(/\w+[\\-]\w.*\w+?/);
  if (!messageFromRegex) return message;
  return capitalize(messageFromRegex[0].split("-").join(" "));
}
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
  setFieldsCard({
    technology,
    id,
    answer,
    question,
    rating,
    isFavorite,
    whoRate,
  }: ICard) {
    this.technology = technology;
    this.id = id;
    this.answer = answer;
    this.question = question;
    this.rating = rating;
    this.isFavorite = isFavorite;
    this.whoRate = whoRate;
  }
  validateFields() {
    if (this.technology === "none") throw Error("Set technology in card");
    if (this.answer === "") throw Error("Set answer in card");
    if (this.question === "") throw Error("Set question in card");
    if (this.id === 0) throw Error("Select card deck");
  }
}

export const useCreateCard = () => {
  const createCard = (card: ICard) => new Card({ ...card });
  return createCard;
};
