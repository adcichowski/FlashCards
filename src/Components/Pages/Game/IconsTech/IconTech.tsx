import styles from "./IconTech.module.scss";
import { Link } from "react-router-dom";
import { Card, TechnologyProperty } from "../../../../Types";
import { useAvaibleTechnologies } from "../useAvaibleTechnologies";
export default function IconTech({ arrayCardData }: { arrayCardData: Card[] }) {
  const { arrayTechnologies, isActiveTechnology } = useAvaibleTechnologies();
  const allDataTechnologies = [...arrayCardData].map(
    ({ technology }) => technology
  );
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
