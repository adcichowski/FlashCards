"use client";
import { validateLoginSchema, validateRegisterSchema } from "server/src/auth/auth-schema";
import { Form } from "../components/Form";
import { signIn } from "next-auth/react";
import { BackgroundBoard } from "src/views/board/components/BackgroundBoard/BackgroundBoard";

export function LoginPage() {
  return (
    <BackgroundBoard>
      <Form
        typeForm="login"
        serverAction={(data) => {
          signIn("credentials", { ...data, callbackUrl: "/board", redirect: true });
        }}
        yupSchema={validateLoginSchema}
      />
    </BackgroundBoard>
  );
}
