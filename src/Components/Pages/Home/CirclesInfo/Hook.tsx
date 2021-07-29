import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
function useAnimationCircles() {
  let getElements = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const elements = getElements.current;
    if (!elements) {
      return;
    }
    const allCircles = [...new Array(3)].map((_, id) => {
      return elements.querySelector(`[id="Ellipse-${id + 1}"]`);
    });
    let tl = gsap.timeline({ scrollTrigger: allCircles[0], delay: 0.5 });
    tl.from(allCircles, {
      strokeDasharray: 0.5,
      stagger: 0.25,
    }).to(allCircles, { strokeDashoffset: Math.floor(Math.random() * 1000) });
  });
  return { getElements };
}
export { useAnimationCircles };
