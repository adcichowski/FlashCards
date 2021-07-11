import React from "react";
import Board from "../Components/Pages/Game/Board/Board";
import Game from "../Pages/Game/Game";
import GeneralCards from "../Pages/Game/GeneralCards/GeneralCards";
import PersonalCards from "../Pages/Game/PersonalCards/PersonalCards";
import PrivateRoute from "./PrivateRoute";
export default function GameRoute() {
  return (
    <Game>
      <PrivateRoute path="/game" exact component={Board} />
      <PrivateRoute
        path="/game/personal-cards"
        exact
        component={PersonalCards}
      />
      <PrivateRoute exact path="/game/general-cards" component={GeneralCards} />
    </Game>
  );
}
//@ts-ignore-end
