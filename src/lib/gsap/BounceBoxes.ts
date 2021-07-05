import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
function BounceBoxes(htmlElements: HTMLElement) {
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
  const allBoxes = [...new Array(6)].map((_, id) => {
    return htmlElements.querySelector(`[id="Box-${id + 1}"]`);
  });
  gsap.registerPlugin(ScrollTrigger);
  let tl = gsap.timeline({
    scrollTrigger: allBoxes[0] as HTMLDivElement,
    delay: 0.2,
  });
  tl.from(allBoxes, {
    duration: 1,
    stagger: 0.25,
    opacity: 0,
    scale: 0.4,
    ease: "bounce",
  });
  for (let box of allBoxes) {
    box?.addEventListener("mouseenter", (e) => {
      if (!box) return null;
      mouseEnterChangeColor(e, box);
    });
  }
  const mouseEnterChangeColor = (e: Event, box: Element) => {
    const getIconID = String(box.children[1].id);
    gsap.to(box, {
      duration: 0.5,
      backgroundColor: "transpaernt",
      fill: typeBoxes[getIconID],
    });
  };

  return null;
}
export { BounceBoxes };
