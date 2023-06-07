import "dotenv";
import Bcrypt from "bcrypt";

export function getEnv(name: string) {
  const val = process.env[name];
  if (!val) {
    throw new Error("Missing ENV for " + name);
  }
  return val;
}

export async function hashTheValue(value: string | Buffer) {
  const salt = await Bcrypt.genSalt();
  return await Bcrypt.hash(value, salt);
}
