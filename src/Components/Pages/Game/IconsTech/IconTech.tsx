import styles from "./IconTech.module.scss";
import { Link } from "react-router-dom";
import { Card, TechnologyProperty } from "../../../../Types";
import { useAvaibleTechnologies } from "../useAvaibleTechnologies";
import { useAnimationGSAP } from "../../../Hooks/useAnimationGSAP";
import { AnimateIconTech } from "../../../../lib/gsap/AnimateIconTech";
export default function IconTech({ arrayCardData }: { arrayCardData: Card[] }) {
  const { avaibleTechnologies, isActiveTechnology } = useAvaibleTechnologies();
  const allDataTechnologies = [...arrayCardData].map(
    ({ technology }) => technology
  );
  const { getElements } = useAnimationGSAP(AnimateIconTech);
  return (
    <>
      <div ref={getElements}>
        <ul className={styles.listIcon}>
          {Object.values(avaibleTechnologies).map(
            ({ render: Component, name }: TechnologyProperty) => (
              <li key={name}>
                <Link
                  to={`/game/personal-cards/${name}`}
                  className={`${styles.svg}
                  ${
                    isActiveTechnology(allDataTechnologies, name)
                      ? ""
                      : styles.linkDisabled
                  }
                `}
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
      </div>
    </>
  );
}
