import { useState } from "react";
import { FlipInstruction } from "../../../../lib/gsap/FlipInstruction";
import { useAnimationGSAP } from "../../../../hooks/useAnimationGSAP";
function useInstruction() {
  const [isFlip, flipCard] = useState(false);
  const { getElements } = useAnimationGSAP(FlipInstruction);
  return { getElements, isFlip, flipCard };
}
export { useInstruction };
