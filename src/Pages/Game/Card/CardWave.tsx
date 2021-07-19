import React from "react";
import { ReactComponent as Wave1 } from "../../../Assets/Pages/Game/QuestionBoard/CardWave/path.svg";
export default function CardWave() {
  const styleWave = {
    position: "absolute",
    overflow: "hidden",
  } as React.CSSProperties;
  return (
    <div style={styleWave}>
      <Wave1 />
    </div>
  );
}
