"use client";
import { validateRegisterSchema } from "server/src/auth/auth-schema";
import { Form } from "../components/Form";
import { registerUserAction } from "src/actions/auth/registerUser";
import { BackgroundBoard } from "src/views/board/components/BackgroundBoard/BackgroundBoard";

export function RegisterPage() {
  return (
    <BackgroundBoard>
      <Form typeForm="register" serverAction={registerUserAction} yupSchema={validateRegisterSchema} />
    </BackgroundBoard>
  );
}
