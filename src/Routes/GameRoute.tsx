import { useAvaibleTechnologies } from "../Components/Pages/Game/useAvaibleTechnologies";
import Board from "../Components/Pages/Game/Board/Board";
import Game from "../Pages/Game/Game";
import PrivateRoute from "./PrivateRoute";
import { Route } from "react-router-dom";
import Some from "./Some";
import { useGameContext } from "../Context/GameContext";
import GenerateBoard from "../Pages/Game/GenerateBoard/GenerateBoard";
export default function GameRoute() {
  const { arrayTechnologies } = useAvaibleTechnologies();
  const {
    state: { personalCards, generalCards },
  } = useGameContext();
  return (
    <Game>
      <PrivateRoute path="/game" exact component={Board} />
      <Route path="/game/personal-cards" exact>
        <GenerateBoard cardsFromData={personalCards} title={"Personal Cards"} />
      </Route>
      <Route exact path="/game/general-cards">
        <GenerateBoard cardsFromData={generalCards} title={"General Cards"} />
      </Route>

      {arrayTechnologies.map(({ name }: { name: string }) => {
        return (
          <Route key={name} exact path={`/game/personal-cards/${name}`}>
            <Some text={name} />
          </Route>
        );
      })}
    </Game>
  );
}
