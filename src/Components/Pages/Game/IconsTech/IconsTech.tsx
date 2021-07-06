import { ReactComponent as HtmlIcon } from "../../../../Assets/Icons/IconsTechnology/html3.svg";
import { ReactComponent as ReactIcon } from "../../../../Assets/Icons/IconsTechnology/react.svg";
import { ReactComponent as VueIcon } from "../../../../Assets/Icons/IconsTechnology/vue.svg";
import { ReactComponent as Css3Icon } from "../../../../Assets/Icons/IconsTechnology/css3.svg";
import { ReactComponent as JavascriptIcon } from "../../../../Assets/Icons/IconsTechnology/javascript.svg";
const IconsTechnology: { [key: string]: JSX.Element } = {
  html: <HtmlIcon />,
  react: <ReactIcon />,
  vue: <VueIcon />,
  css: <Css3Icon />,
  javascript: <JavascriptIcon />,
};
interface IconTechProperty {
  name?: string;
  isActive?: true | false;
}
export default function IconTech({ name, isActive }: IconTechProperty) {
  return [...Object.values(IconsTechnology)].map((Component: any) => (
    <Component className={`${isActive}`} />
  ));
}
