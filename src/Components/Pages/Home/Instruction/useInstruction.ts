import { useState } from "react";
import { useAnimationGSAP } from "../../../Hooks/useAnimationGSAP";
function useInstruction() {
  const [isFlip, flipCard] = useState(false);
  const { getElements } = useAnimationGSAP("FlipInstruction");
  return { getElements, isFlip, flipCard };
}
export { useInstruction };
