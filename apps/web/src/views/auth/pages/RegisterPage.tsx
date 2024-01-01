"use client";
import { validateRegisterSchema } from "server/src/auth/auth-schema";
import { Form } from "../components/Form";
import { registerUserAction } from "src/actions/auth/registerUser";

export function RegisterPage() {
  return <Form typeForm="register" serverAction={registerUserAction} yupSchema={validateRegisterSchema} />;
}
