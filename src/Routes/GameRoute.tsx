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
  const { arrayTechnologies } = useAvaibleTechnologies();
  const {
    state: { personalCards, generalCards },
  } = useGameContext();
  return (
    <Game>
      <PrivateRoute path="/game" exact component={MainBoard} />
      <Route path="/game/personal-cards" exact>
        <GenerateBoard cardsData={personalCards} title={"Personal Cards"} />
      </Route>
      <Route exact path="/game/general-cards">
        <GenerateBoard cardsData={generalCards} title={"General Cards"} />
      </Route>
      <CardProvider>
        <Route exact path={"/game/personal-cards/add"}>
          <AddCard />
        </Route>
      </CardProvider>

      {arrayTechnologies.map(({ name }: { name: string }) => {
        return (
          <CardProvider key={name}>
            <Route exact path={`/game/personal-cards/${name}`}>
              <QuestionBoard
                technologyBoardName={name}
                cardsData={personalCards}
              />
            </Route>
          </CardProvider>
        );
      })}
    </Game>
  );
}
