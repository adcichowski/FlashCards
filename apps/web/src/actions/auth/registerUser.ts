"use server";
import { TypeRegisterSchema } from "server/src/auth/auth-schema";
import { fetcher } from "src/utils/fetcher";

export const registerUserAction = async (data: TypeRegisterSchema) => {
  return await fetcher<{ userId: string }>({ endpoint: "users", body: data, method: "POST" });
};
