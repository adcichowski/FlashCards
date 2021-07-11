import { ReactComponent as HtmlIcon } from "../../../../Assets/Icons/IconsTechnology/html5.svg";
import { ReactComponent as ReactIcon } from "../../../../Assets/Icons/IconsTechnology/react.svg";
import { ReactComponent as VueIcon } from "../../../../Assets/Icons/IconsTechnology/vue.svg";
import { ReactComponent as Css3Icon } from "../../../../Assets/Icons/IconsTechnology/css3.svg";
import { ReactComponent as JavascriptIcon } from "../../../../Assets/Icons/IconsTechnology/javascript.svg";
import styles from "./IconsTech.module.scss";

import { Link } from "react-router-dom";
import { Card } from "../../../../Types";
const AvaibleTechnologies: AvaibleTechnologiesProperty = {
  html5: { name: "html5", render: HtmlIcon, fill: "#F73802" },
  react: { name: "react", render: ReactIcon, fill: "#459CB4" },
  vue: { name: "vue", render: VueIcon, fill: "#398361" },
  css3: { name: "css3", render: Css3Icon, fill: "#12629B" },
  javascript: { name: "javascript", render: JavascriptIcon, fill: "#F7DF1E" },
};
interface AvaibleTechnologiesProperty {
  [key: string]: TechnologyProperty;
}
interface TechnologyProperty {
  name: string;
  render: React.ComponentType;
  fill: string;
}
export default function IconTech({ arrayCard }: { arrayCard: Card[] }) {
  const getAllPersonalTech = [...arrayCard].map(({ technology }) => technology);
  const allAvaibleTechnologies: TechnologyProperty[] =
    Object.values(AvaibleTechnologies);
  const isActiveTechnology = (nameTech: string): boolean => {
    return getAllPersonalTech.includes(nameTech);
  };
  // const { current } = getElements;
  // if (!current) return;
  // //@ts-ignore
  // const svg = current.querySelectorAll("svg");
  // //@ts-ignore
  // svg.forEach((element, i) => {
  //   element.addEventListener("click", (e: Event) => {
  //     ColorizeIcon(element, IconsTechnology[i].fill);
  //   });
  // }
  //@ts-ignore
  return (
    <ul className={styles.listIcon}>
      {allAvaibleTechnologies.map(
        ({ render: Component, name }: TechnologyProperty) => (
          <li key={name}>
            <Link
              to={`game/personal-cards/${name}`}
              className={isActiveTechnology(name) ? "" : styles.linkDisabled}
            >
              <div
                className={`${styles.icon} ${
                  isActiveTechnology(name) ? styles.active : styles.linkDisabled
                }`}
              >
                <Component />
              </div>
            </Link>
          </li>
        )
      )}
    </ul>
  );
}
