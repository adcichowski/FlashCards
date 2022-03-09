import gsap from "gsap";
function ColorizeIcon(element: Element, color: string) {
  gsap.to(element, {
    fill: color,
  });
}
export { ColorizeIcon };
