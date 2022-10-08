import { useLayoutEffect, useState } from "react";

export function useModalPortal() {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);
  const wrapperId = "modal-root";
  useLayoutEffect(() => {
    const element = document.getElementById(wrapperId);
    if (!element) return;
    setWrapperElement(element);
  }, [wrapperId]);
  return { wrapperElement };
}
