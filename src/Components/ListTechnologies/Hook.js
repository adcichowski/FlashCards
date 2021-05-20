import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

const typeBoxes = {
  javascript: "#F7DF1E",
  vue: "#398361",
  html5: "#F73802",
  css3: "#12629B",
  typescript: "#265F9E",
  react: "#459CB4",
};

export default function useAnimationTechnologies() {
  const getBoxes = useRef(null);
  useEffect(() => {
    const [elements] = getBoxes.current.children;
    const allBoxes = elements.querySelectorAll(
      Object.keys(typeBoxes).map((_, id) => `[id="Box-${id + 1}"]`)
    );
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline({ scrollTrigger: allBoxes[0], delay: 1 });
    tl.from([...allBoxes], {
      duration: 1,
      stagger: 0.1,
      scale: 0.01,
      ease: "bounce",
    });
    for (let box of allBoxes) {
      box.addEventListener("mouseenter", (e) => {
        let getIcon = e.path[0].childNodes[1];
        gsap.to(getIcon, {
          duration: 0.5,
          fill: typeBoxes[getIcon.id],
        });
      });
    }
  });
  return { getBoxes };
}
