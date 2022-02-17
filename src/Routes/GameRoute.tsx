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
import { QueryClient, QueryClientProvider } from "react-query";
function GameRoute() {
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const { state } = useAuthContext();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Game>
        <PrivateRoute path="/game">
          <MainBoard />
        </PrivateRoute>
        <Route exact path="/game/personal-cards">
          <BoardWithIcons />
        </Route>
        <Route exact path="/game/general-cards">
          <BoardWithIcons />
        </Route>
        <Route path={"/game/add"}>
          <AddCard />
        </Route>

        {Object.values(avaibleTechnologies).map(
          ({ name }: { name: Technologies }) => {
            return state.personalCards[name]
              ? state.personalCards[name].length > 0 && (
                  <React.Fragment key={name}>
                    <PrivateRoute path={`/game/personal-cards/${name}`}>
                      <QuestionsBoard
                        typeBoard="personalCards"
                        cardsData={state.personalCards[name]}
                      />
                    </PrivateRoute>
                  </React.Fragment>
                )
              : null;
          }
        )}
        {Object.values(avaibleTechnologies).map(
          ({ name }: { name: Technologies }) => (
            <React.Fragment key={name}>
              <PrivateRoute path={`/game/general-cards/${name}`}>
                <QuestionsBoard
                  typeBoard="generalCards"
                  cardsData={state.generalCards[name]}
                />
              </PrivateRoute>
            </React.Fragment>
          )
        )}
        <React.Fragment>
          <PrivateRoute path={`/game/personal-cards/favorite`}>
            <QuestionsBoard
              typeBoard="favoriteCards"
              cardsData={state?.personalCards?.favorites}
            />
          </PrivateRoute>
        </React.Fragment>
      </Game>
    </QueryClientProvider>
  );
}
export { GameRoute };
