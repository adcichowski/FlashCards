import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
export default function useInstruction() {
  const [isFlip, flipCard] = useState(false);
  const getElements = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const elements = getElements.current;
    console.log(elements);
    if (!elements) {
      return;
    }
    const frameBorder = Array.from(elements.querySelectorAll(".frame__border"));
    const frameArrow = Array.from(elements.querySelectorAll(".frame__arrow"));
    const card = elements.querySelector("#Card");

    let tl = gsap.timeline({ scrollTrigger: card, delay: 0.5 });
    tl.from(card, {
      opacity: 0,
      duration: 1,
      ease: "power1",
    })
      .from(frameBorder, {
        opacity: 0,
        duration: 0.5,
        ease: "power2",
      })
      .from([...frameArrow].reverse(), {
        stroke: 20,
        duration: 3,
        stagger: 0.35,
        opacity: 0,
        ease: "back",
      });
  });
  return { getElements, isFlip, flipCard };
}
