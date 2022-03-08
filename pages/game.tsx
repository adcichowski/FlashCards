import React from "react";
import { MainBoard } from "src/Components/Pages/Game/MainBoard/MainBoard";
import { Game } from "src/Pages/Game/Game";

export default function GamePage() {
  return (
    <Game>
      <MainBoard />
    </Game>
  );
}
