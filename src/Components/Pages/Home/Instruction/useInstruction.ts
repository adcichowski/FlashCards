import { useState } from "react";
import { FlipInstruction } from "../../../../Lib/gsap/FlipInstruction";
import { useAnimationGSAP } from "../../../Hooks/useAnimationGSAP";
function useInstruction() {
  const [isFlip, flipCard] = useState(false);
  const { getElements } = useAnimationGSAP(FlipInstruction);
  return { getElements, isFlip, flipCard };
}
export { useInstruction };
