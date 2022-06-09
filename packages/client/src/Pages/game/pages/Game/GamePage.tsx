import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthContext } from "src/context/AuthContext";
import { BackgroundGame } from "../../components/BackgroundGame/BackgroundGame";

export function GamePage() {
  const {
    state: { isLogin },
  } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLogin) router.push("/login");
  });
  return (
    <BackgroundGame>
      <h1>There will be cards to choose</h1>
    </BackgroundGame>
  );
}
