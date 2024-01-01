"use server";
import { TypeRegisterSchema, validateRegisterSchema } from "server/src/auth/auth-schema";
import { fetcher } from "src/utils/fetcher";

export const registerUserAction = async (data: TypeRegisterSchema) => {
  await fetcher<{ email: string; token: string }>({ endpoint: "users", body: data, method: "POST" });
};
