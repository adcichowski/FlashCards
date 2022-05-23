import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthContext } from "src/Context/AuthContext";

import { MainBoard } from "../src/Components/Pages/Game/MainBoard/MainBoard";
import { Game } from "../src/Pages/Game/Game";

export default function GamePage() {
  const {
    state: { isLogin },
  } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!isLogin) router.push("/login");
  });
  return (
    <Game>
      <MainBoard />
    </Game>
  );
}
