//Remember put not found icon if some badge not have assigned icon.

import CSS3Icon from "public/icons/technology/css3.svg";
import VueIcon from "public/icons/technology/vue.svg";
import TsIcon from "public/icons/technology/typescript.svg";
import HtmlIcon from "public/icons/technology/html5.svg";
import ReactIcon from "public/icons/technology/react.svg";
import JsIcon from "public/icons/technology/javascript.svg";
import NotFoundIcon from "public/icons/technology/not-found.svg";
import BackendIcon from "public/icons/technology/backend.svg";
import FrontendIcon from "public/icons/technology/frontend.svg";
import DesignIcon from "public/icons/technology/design.svg";

export const techs = {
  backend: {
    Icon: BackendIcon,
  },
  frontend: {
    Icon: FrontendIcon,
  },
  html: {
    Icon: HtmlIcon,
  },
  react: {
    Icon: ReactIcon,
  },
  css: {
    Icon: CSS3Icon,
  },
  vue: {
    Icon: VueIcon,
  },
  typescript: {
    Icon: TsIcon,
  },
  javascript: {
    Icon: JsIcon,
  },
  database: {
    Icon: NotFoundIcon,
  },
  design: {
    Icon: DesignIcon,
  },
} satisfies Record<string, { Icon: JSX.Element }>;
