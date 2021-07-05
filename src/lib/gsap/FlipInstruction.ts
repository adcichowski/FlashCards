import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
function FlipInstruction(htmlElements: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const frameBorder = Array.from(
    htmlElements.querySelectorAll(".frame__border")
  );
  const frameArrow = Array.from(htmlElements.querySelectorAll(".frame__arrow"));
  const card = htmlElements.querySelector("#Card");

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
    .to(frameArrow.reverse(), {
      stroke: 20,
      duration: 3,
      stagger: 0.35,
      opacity: 1,
      ease: "back",
    });
}
export { FlipInstruction };
