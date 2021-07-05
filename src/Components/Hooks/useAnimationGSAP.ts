import { useEffect, useRef } from "react";
import { BounceBoxes } from "../../lib/gsap/BounceBoxes";
import { FlipInstruction } from "../../lib/gsap/FlipInstruction";
function useAnimationGSAP(nameAnimation: string) {
  const getElements = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elements = getElements.current;
    if (!elements) {
      return;
    }
    switch (nameAnimation) {
      case "BounceBoxes":
        BounceBoxes(elements);
        return;
      case "FlipInstruction":
        FlipInstruction(elements);
        return;
    }
  });
  return { getElements };
}
export { useAnimationGSAP };
