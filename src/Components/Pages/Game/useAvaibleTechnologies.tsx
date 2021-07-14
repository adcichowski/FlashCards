import { ReactComponent as HtmlIcon } from "../../../Assets/Icons/IconsTechnology/html5.svg";
import { ReactComponent as ReactIcon } from "../../../Assets/Icons/IconsTechnology/react.svg";
import { ReactComponent as VueIcon } from "../../../Assets/Icons/IconsTechnology/vue.svg";
import { ReactComponent as Css3Icon } from "../../../Assets/Icons/IconsTechnology/css3.svg";
import { ReactComponent as JavascriptIcon } from "../../../Assets/Icons/IconsTechnology/javascript.svg";
import { ReactComponent as TypescriptIcon } from "../../../Assets/Icons/IconsTechnology/typescript.svg";
import { AvaibleTechnologiesProperty } from "../../../Types";

export function useAvaibleTechnologies() {
  const avaibleTechnologies: AvaibleTechnologiesProperty = {
    html5: { name: "html5", render: HtmlIcon, fill: "#F73802" },
    react: { name: "react", render: ReactIcon, fill: "#459CB4" },
    vue: { name: "vue", render: VueIcon, fill: "#398361" },
    css3: { name: "css3", render: Css3Icon, fill: "#12629B" },
    javascript: { name: "javascript", render: JavascriptIcon, fill: "#F7DF1E" },
    typescript: { name: "typescript", render: TypescriptIcon, fill: "#265F9E" },
  };
  const arrayTechnologies = Object.values(avaibleTechnologies);

  const isActiveTechnology = (
    arrayTech: string[],
    nameTech: string
  ): boolean => {
    return arrayTech.includes(nameTech);
  };

  return { avaibleTechnologies, arrayTechnologies, isActiveTechnology };
}
