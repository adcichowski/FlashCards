import React from "react";
import { ReactComponent as Wave1 } from "../../../../Assets/Pages/Game/QuestionBoard/CardWave/Path1.svg";
import { ReactComponent as Wave2 } from "../../../../Assets/Pages/Game/QuestionBoard/CardWave/Path2.svg";
import { ReactComponent as Wave3 } from "../../../../Assets/Pages/Game/QuestionBoard/CardWave/Path3.svg";
import { ReactComponent as Wave4 } from "../../../../Assets/Pages/Game/QuestionBoard/CardWave/Path4.svg";
import { ReactComponent as Wave5 } from "../../../../Assets/Pages/Game/QuestionBoard/CardWave/Path5.svg";
import { ReactComponent as Wave6 } from "../../../../Assets/Pages/Game/QuestionBoard/CardWave/Path6.svg";
import { ReactComponent as Wave7 } from "../../../../Assets/Pages/Game/QuestionBoard/CardWave/Path7.svg";
import { ReactComponent as Wave8 } from "../../../../Assets/Pages/Game/QuestionBoard/CardWave/Path8.svg";
import { ReactComponent as Wave9 } from "../../../../Assets/Pages/Game/QuestionBoard/CardWave/Path9.svg";
import { ReactComponent as Wave10 } from "../../../../Assets/Pages/Game/QuestionBoard/CardWave/Path10.svg";
import { useCardContext } from "../../../../Context/CardContext";

function CardWave({ color }: { color: string }) {
  const arraySVG = [
    Wave1,
    Wave2,
    Wave3,
    Wave4,
    Wave5,
    Wave6,
    Wave7,
    Wave8,
    Wave9,
    Wave10,
  ];
  const { state } = useCardContext();
  const RandomWaveRender = arraySVG[state.randomSvgCard];
  const styleWave = {
    fill: `${color}`,
    opacity: 0.75,
    position: "absolute",
    overflow: "hidden",
  } as React.CSSProperties;
  return (
    <div style={styleWave}>
      <RandomWaveRender />
    </div>
  );
}
export { CardWave };
