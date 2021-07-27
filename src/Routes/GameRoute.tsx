import { useAvaibleTechnologies } from "../Components/Pages/Game/useAvaibleTechnologies";
import MainBoard from "../Components/Pages/Game/MainBoard/MainBoard";
import Game from "../Pages/Game/Game";
import PrivateRoute from "./PrivateRoute";
import { Route } from "react-router-dom";
import { useGameContext } from "../Context/GameContext";
import GenerateBoard from "../Pages/Game/GenerateBoard/GenerateBoard";
import QuestionBoard from "../Pages/Game/GenerateBoard/QuestionsBoard/QuestionBoard";
import CardProvider from "../Context/CardContext";
import AddCard from "../Pages/Game/GenerateBoard/AddCard/AddCard";
export default function GameRoute() {
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const { state } = useGameContext();
  return (
    <Game>
      <PrivateRoute path="/game" exact component={MainBoard} />
      <Route path="/game/personal-cards" exact>
        <GenerateBoard
          cardsData={state.personalCards}
          title={"Personal Cards"}
        />
      </Route>
      <Route exact path="/game/general-cards">
        <GenerateBoard cardsData={state.generalCards} title={"General Cards"} />
      </Route>
      <CardProvider>
        <Route exact path={"/game/personal-cards/add"}>
          <AddCard />
        </Route>
      </CardProvider>

      {Object.values(avaibleTechnologies).map(({ name }: { name: string }) => {
        return (
          <CardProvider key={name}>
            <Route exact path={`/game/personal-cards/${name}`}>
              <QuestionBoard
                technologyBoardName={name}
                cardsData={state.personalCards}
              />
            </Route>
          </CardProvider>
        );
      })}
    </Game>
  );
}
