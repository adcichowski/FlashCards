import styles from "./IconsTech.module.scss";

import { Link } from "react-router-dom";
import { Card, TechnologyProperty } from "../../../../Types";
import { useAvaibleTechnologies } from "../useAvaibleTechnologies";
export default function IconTech({ arrayCard }: { arrayCard: Card[] }) {
  const { arrayTechnologies, isActiveTechnology } = useAvaibleTechnologies();
  const allDataTechnologies = [...arrayCard].map(
    ({ technology }) => technology
  );
  console.log(arrayCard, arrayTechnologies, "to");
  return (
    <ul className={styles.listIcon}>
      {arrayTechnologies.map(
        ({ render: Component, name }: TechnologyProperty) => (
          <li key={name}>
            <Link
              to={`/game/personal-cards/${name}`}
              className={
                isActiveTechnology(allDataTechnologies, name)
                  ? ""
                  : styles.linkDisabled
              }
            >
              <div
                className={`${styles.icon} ${
                  isActiveTechnology(allDataTechnologies, name)
                    ? styles.active
                    : styles.linkDisabled
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
