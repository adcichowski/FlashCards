import {
  Technologies,
  useAvaibleTechnologies,
} from "../Components/Pages/Game/useAvaibleTechnologies";
import { MainBoard } from "../Components/Pages/Game/MainBoard/MainBoard";
import { Game } from "../Pages/Game/Game";
import { PrivateRoute } from "./PrivateRoute";
import { Route } from "react-router-dom";
import { BoardWithIcons } from "../Pages/Game/GenerateBoard/BoardWithIcons";
import { QuestionsBoard } from "../Pages/Game/GenerateBoard/QuestionsBoard/QuestionsBoard";
import { AddCard } from "../Pages/Game/AddCard/AddCard";
import { useAuthContext } from "../Context/AuthContext";
import React from "react";
function GameRoute() {
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const { state } = useAuthContext();
  return (
    <Game>
      <PrivateRoute path="/game">
        <MainBoard />
      </PrivateRoute>
      <Route exact path="/game/personal-cards">
        <BoardWithIcons cardsData={state.personalCards} typeBoard="personal" />
      </Route>
      <Route exact path="/game/general-cards">
        <BoardWithIcons cardsData={state.generalCards} typeBoard="general" />
      </Route>

      <Route path={"/game/add"}>
        <AddCard />
      </Route>

      {Object.values(avaibleTechnologies).map(
        ({ name }: { name: Technologies }) =>
          state.personalCards[name] && (
            <React.Fragment key={name}>
              <PrivateRoute path={`/game/personal-cards/${name}`}>
                <QuestionsBoard
                  typeBoard="personalCards"
                  technologyName={name}
                  cardsData={state.personalCards}
                />
              </PrivateRoute>
            </React.Fragment>
          )
      )}
      {Object.values(avaibleTechnologies).map(
        ({ name }: { name: Technologies }) =>
          state.generalCards[name] && (
            <React.Fragment key={name}>
              <PrivateRoute path={`/game/general-cards/${name}`}>
                <QuestionsBoard
                  typeBoard="generalCards"
                  technologyName={name}
                  cardsData={state.generalCards}
                />
              </PrivateRoute>
            </React.Fragment>
          )
      )}
      <React.Fragment>
        <PrivateRoute path={`/game/personal-cards/favorite`}>
          <QuestionsBoard
            typeBoard="personalCards"
            technologyName={"favorites"}
            cardsData={state.personalCards}
          />
        </PrivateRoute>
      </React.Fragment>
    </Game>
  );
}
export { GameRoute };
