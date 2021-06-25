export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export function getRandomMinMax(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
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
};
