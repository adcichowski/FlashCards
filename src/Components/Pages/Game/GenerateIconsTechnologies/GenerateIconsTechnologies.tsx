import styles from "./GenerateIconsTechnologies.module.scss";
import { Link } from "react-router-dom";
import { Card, TechnologyProperty } from "../../../../Types";
import { useAvaibleTechnologies } from "../useAvaibleTechnologies";
import { useAnimationGSAP } from "../../../Hooks/useAnimationGSAP";
import { AnimateIconTech } from "../../../../lib/gsap/AnimateIconTech";
import { capitalize } from "../../../../Utils/Utils";
export default function GenerateIconsTechnologies({
  arrayCardsData,
}: {
  arrayCardsData: Card[];
}) {
  const { avaibleTechnologies } = useAvaibleTechnologies();
  const allDataTechnologies = [...arrayCardsData].map(
    ({ technology }) => technology
  );
  const setActiveStyle = (name: string) =>
    allDataTechnologies.includes(name) ? "" : styles.linkDisabled;
  const { getElements } = useAnimationGSAP(AnimateIconTech);
  return (
    <>
      <div ref={getElements}>
        <ul className={styles.listIcon}>
          {Object.values(avaibleTechnologies).map(
            ({ render: Component, name, type }: TechnologyProperty) => (
              <li key={name} className={`${setActiveStyle(name)}`}>
                <Link
                  to={`/game/personal-cards/${name}`}
                  className={styles.technology}
                >
                  <div>
                    <div className={styles.icon}>
                      <p className={styles.technologyType}>{type}</p>
                      <Component />
                    </div>
                    <p className={styles.nameTechnology}>{capitalize(name)}</p>
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
