import React from "react";
import useAnimationTechnologies from "./Hook";
import { ReactComponent as Technologies } from "../../Assets/IconsTechnology/Technologies-2.svg";
import styles from "./ListTechnologies.module.scss";
export default function ListTechnologies() {
  const { getBoxes } = useAnimationTechnologies();

  return (
    <>
      <div ref={getBoxes} className={styles.technologies}>
        <Technologies />
      </div>
    </>
  );
}
