"use client";
import { validateRegisterSchema } from "server/src/auth/auth-schema";
import { Form } from "../components/Form";

export function RegisterPage() {
  return <Form typeForm="register" mutation={() => {}} yupSchema={validateRegisterSchema} />;
}
