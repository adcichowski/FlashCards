import { useEffect, useRef } from "react";
function useAnimationGSAP(nameAnimation: (element: HTMLDivElement) => void) {
  const getElements = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elements = getElements.current;
    if (!elements) {
      return;
    }
    nameAnimation(elements);
  });
  return { getElements };
}
export { useAnimationGSAP };
