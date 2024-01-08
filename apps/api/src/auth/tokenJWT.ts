import Jwt from "jsonwebtoken";

const MAX_AGE = 24 * 60 * 60;

export const createTokenJWT = (userId: string) => {
  const { SECRET_SESSION } = process.env;
  if (!SECRET_SESSION) return new Error("Secret Session is not set!");

  return Jwt.sign({ userId }, SECRET_SESSION, { expiresIn: MAX_AGE });
};
