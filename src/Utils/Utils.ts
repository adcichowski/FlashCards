/* eslint-disable no-useless-escape */
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PASSWORD_REGEX = /^.{12,32}$/;
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
        "Password must be at least 12 characters long, but smaller than 64 characters.",
    },
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
