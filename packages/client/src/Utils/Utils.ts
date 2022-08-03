export function getRandomMinMax(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export function capitalize(text: string) {
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}
export function validateInputOnlyNumbers(input: string) {
  return /^\d+$/.test(input);
}
export function changeMessageFromFirebase(message: string) {
  const messageFromRegex = /\w+[\\-]\w.*\w+?/.exec(message);
  if (!messageFromRegex) return message;
  return capitalize(messageFromRegex[0].split("-").join(" "));
}
