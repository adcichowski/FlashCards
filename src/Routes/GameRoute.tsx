import { useAvaibleTechnologies } from "../Components/Pages/Game/useAvaibleTechnologies";
import { MainBoard } from "../Components/Pages/Game/MainBoard/MainBoard";
import { Game } from "../Pages/Game/Game";
import { PrivateRoute } from "./PrivateRoute";
import { Route } from "react-router-dom";
import { useGameContext } from "../Context/GameContext";
import { GenerateBoard } from "../Pages/Game/GenerateBoard/GenerateBoard";
import { QuestionBoard } from "../Pages/Game/GenerateBoard/QuestionsBoard/QuestionBoard";
import { CardProvider } from "../Context/CardContext";
import { AddCard } from "../Pages/Game/AddCard/AddCard";
function GameRoute() {
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const { state } = useGameContext();
  return (
    <Game>
      <PrivateRoute exact path="/game" component={MainBoard} />
      <Route exact path="/game/personal-cards">
        <GenerateBoard cardsData={state.personalCards} typeBoard="personal" />
      </Route>
      <Route exact path="/game/general-cards">
        <GenerateBoard cardsData={state.generalCards} typeBoard="general" />
      </Route>
      <CardProvider>
        <Route path={"/game/add"}>
          <AddCard />
        </Route>
      </CardProvider>

      {Object.values(avaibleTechnologies).map(({ name }: { name: string }) => {
        return (
          <div key={name}>
            <CardProvider>
              <Route exact path={`/game/personal-cards/${name}`}>
                <QuestionBoard
                  technologyName={name}
                  cardsData={state.personalCards}
                />
              </Route>
            </CardProvider>
            <CardProvider key={name}>
              <Route exact path={`/game/general-cards/${name}`}>
                <QuestionBoard
                  technologyName={name}
                  cardsData={state.generalCards}
                />
              </Route>
            </CardProvider>
          </div>
        );
      })}
    </Game>
  );
}
export { GameRoute };
