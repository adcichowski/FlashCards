import { useAvaibleTechnologies } from "../Components/Pages/Game/AvaibleTechnologies/useAvaibleTechnologies";
import Board from "../Components/Pages/Game/Board/Board";
import Game from "../Pages/Game/Game";
import GeneralCards from "../Pages/Game/GeneralCards/GeneralCards";
import PersonalCards from "../Pages/Game/PersonalCards/PersonalCards";
import PrivateRoute from "./PrivateRoute";
import { Route } from "react-router-dom";
import Some from "./Some";
export default function GameRoute() {
  const { arrayTechnologies } = useAvaibleTechnologies();

  return (
    <Game>
      <PrivateRoute path="/game" exact component={Board} />
      <PrivateRoute
        path="/game/personal-cards"
        exact
        component={PersonalCards}
      />
      <PrivateRoute exact path="/game/general-cards" component={GeneralCards} />

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
