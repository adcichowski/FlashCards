"use client";
import { validateLoginSchema, validateRegisterSchema } from "server/src/auth/auth-schema";
import { Form } from "../components/Form";
import { signIn } from "next-auth/react";
import { BackgroundGame } from "src/views/game/components/BackgroundGame/BackgroundGame";

export function LoginPage() {
  return (
    <BackgroundGame>
      <Form
        typeForm="login"
        serverAction={(data) => {
          signIn("credentials", data);
        }}
        yupSchema={validateLoginSchema}
      />
    </BackgroundGame>
  );
}
