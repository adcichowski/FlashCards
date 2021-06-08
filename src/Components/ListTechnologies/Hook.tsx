import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

interface TypeBoxes {
  [key: string]: string;
}
const typeBoxes: TypeBoxes = {
  javascript: "#F7DF1E",
  vue: "#398361",
  html5: "#F73802",
  css3: "#12629B",
  typescript: "#265F9E",
  react: "#459CB4",
};
export default function useAnimationTechnologies() {
  const getBoxes = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elements = getBoxes.current;
    if (elements) {
      const allBoxes = [...new Array(6)].map((_, id) => {
        return elements.querySelector(`[id="Box-${id + 1}"]`);
      });
      gsap.registerPlugin(ScrollTrigger);
      let tl = gsap.timeline({
        scrollTrigger: allBoxes[0] as HTMLDivElement,
        delay: 0.2,
      });
      tl.from(allBoxes, {
        duration: 1,
        stagger: 0.1,
        opacity: 0,
        scale: 0.3,
        ease: "bounce",
      });
      for (let box of allBoxes) {
        if (box) {
          box.addEventListener("mouseenter", (e) => {
            const getIconID = String(box?.children[1].id);
            gsap.to(e.target, {
              duration: 0.5,
              backgroundColor: "transpaernt",
              fill: typeBoxes[getIconID],
            });
          });
        }
      }
    }
  });
  return { getBoxes };
}
