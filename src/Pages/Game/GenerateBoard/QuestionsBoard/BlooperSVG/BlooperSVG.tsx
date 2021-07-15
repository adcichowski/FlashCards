import { ReactComponent as Bloopers } from "../../../../../Assets/Pages/Game/QuestionBoard/bloopers.svg";
import { useRef, useEffect } from "react";
import styles from "./BlooperSVG.module.scss";
export default function BlooperSVG({ fill }: { fill: string }) {
  const getElements = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elements = getElements.current;
    if (!elements) return;
    const bloopers = elements.querySelectorAll(".bloop");
    for (let bloop of bloopers) {
      bloop.setAttribute("style", `fill:${fill}`);
    }
  });
  return (
    <div className={styles.container} ref={getElements}>
      <Bloopers />
    </div>
  );
}
