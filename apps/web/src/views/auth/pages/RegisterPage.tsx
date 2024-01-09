"use client";
import { validateRegisterSchema } from "server/src/auth/auth-schema";
import { Form } from "../components/Form";
import { registerUserAction } from "src/actions/auth/registerUser";
import { BackgroundGame } from "src/views/game/components/BackgroundGame/BackgroundGame";

export function RegisterPage() {
  return (
    <BackgroundGame>
      <Form typeForm="register" serverAction={registerUserAction} yupSchema={validateRegisterSchema} />
    </BackgroundGame>
  );
}
