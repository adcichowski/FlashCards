import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
export default function useInstruction() {
  const [isFlip, flipCard] = useState(false);
  const getElements = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (getElements && getElements.current) {
      gsap.registerPlugin(ScrollTrigger);
      const elements = getElements.current;
      const frameBorder = elements.querySelectorAll(".frame__border");
      const frameArrow = elements.querySelectorAll(".frame__arrow");
      const card = elements.querySelector("#Card");
      if (card) {
        let tl = gsap.timeline({ scrollTrigger: card, delay: 0.5 });
        tl.to(card, {
          opacity: 1,
          duration: 1,
          ease: "power1",
        })
          .to(frameBorder, {
            opacity: 1,
            duration: 0.5,
            ease: "power2",
          })
          .to([...frameArrow].reverse(), {
            strokeDasharray: 1000,
            strokeDashoffset: 120,
            stroke: 20,
            duration: 3,
            stagger: 0.35,
            opacity: 1,
            ease: "back",
          });
      }
    }
  });
  return { getElements, isFlip, flipCard };
}
