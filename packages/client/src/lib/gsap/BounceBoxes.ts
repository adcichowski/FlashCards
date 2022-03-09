import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ColorizeIcon } from "./ColorizeIcon";
function BounceBoxes(htmlElements: HTMLElement) {
  interface TypeBoxes {
    readonly [key: string]: string;
  }
  const typeBoxes: TypeBoxes = {
    javascript: "#F7DF1E",
    vue: "#398361",
    html5: "#F73802",
    css3: "#12629B",
    typescript: "#265F9E",
    react: "#459CB4",
  };
  const allBoxes = htmlElements.querySelectorAll(`[data-name="Box"]`);

  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({
    scrollTrigger: allBoxes[0] as HTMLDivElement,
    delay: 0.2,
  });
  tl.from(allBoxes, {
    duration: 1,
    stagger: 0.3,
    opacity: 0,
    ease: "bounce",
  });

  allBoxes.forEach((box) => {
    box?.addEventListener("mouseenter", (e) => {
      mouseEnterChangeColor(e, box);
    });
  });

  const mouseEnterChangeColor = (_: Event, box: Element) => {
    const getIconID = box.children[1].getAttribute("data-name");
    if (getIconID) ColorizeIcon(box, typeBoxes[getIconID]);
  };
}
export { BounceBoxes };
