import { ReactComponent as HtmlIcon } from "../../../Assets/Icons/IconsTechnology/html5.svg";
import { ReactComponent as ReactIcon } from "../../../Assets/Icons/IconsTechnology/react.svg";
import { ReactComponent as VueIcon } from "../../../Assets/Icons/IconsTechnology/vue.svg";
import { ReactComponent as Css3Icon } from "../../../Assets/Icons/IconsTechnology/css3.svg";
import { ReactComponent as JavascriptIcon } from "../../../Assets/Icons/IconsTechnology/javascript.svg";
import { ReactComponent as TypescriptIcon } from "../../../Assets/Icons/IconsTechnology/typescript.svg";
import { AvaibleTechnologiesProperty } from "../../../Types/Types";
function useAvaibleTechnologies() {
  const avaibleTechnologies: AvaibleTechnologiesProperty = {
    html5: {
      name: "html5",
      type: "Front-end",
      description:
        "HTML5 is the latest version of Hypertext Markup Language, the code that describes web pages.",
      render: HtmlIcon,
      fill: "#F73802",
    },
    react: {
      name: "react",
      type: "Front-end",
      description:
        "React is a free and open-source front-end JavaScript library for building user interfaces or UI components.",
      render: ReactIcon,
      fill: "#459CB4",
    },
    vue: {
      name: "vue",
      type: "Front-end",
      description:
        "Vue is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.",
      render: VueIcon,
      fill: "#398361",
    },
    css3: {
      name: "css3",
      type: "Front-end",
      description:
        "Cascading Style Sheets is a language that is used to illustrate the look, style, and format of a document written in any markup language.",
      render: Css3Icon,
      fill: "#12629B",
    },
    javascript: {
      name: "javascript",
      type: "Front-end",
      description:
        "JavaScript is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.",
      render: JavascriptIcon,
      fill: "#F7DF1E",
    },
    typescript: {
      name: "typescript",
      type: "Front-end",
      description:
        "TypeScript is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.",
      render: TypescriptIcon,
      fill: "#265F9E",
    },
  };
  function getAvaibleTechnologies(technologies: string[]) {
    const arrayAvaibleTechnologies = [
      ...Object.values(avaibleTechnologies),
    ].map(({ name, render, type, description }) => {
      return {
        name,
        type,
        description,
        render,
        isActive: technologies.includes(name),
      };
    });
    return arrayAvaibleTechnologies;
  }

  return {
    avaibleTechnologies,
    getAvaibleTechnologies,
  };
}
export { useAvaibleTechnologies };
