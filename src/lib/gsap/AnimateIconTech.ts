import { useAvaibleTechnologies } from "../../Components/Pages/Game/useAvaibleTechnologies";
import { ColorizeIcon } from "./ColorizeIcon";
import gsap from "gsap";
export function AnimateIconTech(elements: HTMLDivElement) {
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const allIcon = elements.querySelectorAll("svg");
  const arrayNameColor = Object.values(avaibleTechnologies).reduce<
    Record<string, string>
  >((prevValue, arrayObj) => {
    prevValue[arrayObj.name] = arrayObj.fill;
    return prevValue;
  }, {});
  for (let icon of allIcon) {
    const getIconID = String(icon.children[0].id);
    gsap.to(icon.children[0], {
      stroke: arrayNameColor[getIconID],
      strokeWidth: "1",
    });
    icon.addEventListener("mouseenter", (e) => {
      ColorizeIcon(icon, arrayNameColor[getIconID]);
    });
    icon.addEventListener("mouseleave", () => {
      ColorizeIcon(icon, "#000000");
    });
  }
}
