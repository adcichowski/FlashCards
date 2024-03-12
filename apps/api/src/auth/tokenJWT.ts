import Jwt from "jsonwebtoken";
import { validateTokenSchema } from "./auth-schema";

const MAX_AGE = 24 * 60 * 60;

export const createTokenJWT = (user: { userId: string; role: string }) => {
  const { SECRET_SESSION } = process.env;
  if (!SECRET_SESSION) return new Error("Secret Session is not set!");

  return Jwt.sign(user, SECRET_SESSION, { expiresIn: MAX_AGE });
};

export const decodeJWT = (jwt: string) => {
  const decodedJwt = Jwt.decode(jwt);

  return validateTokenSchema.validateSync(decodedJwt);
};
