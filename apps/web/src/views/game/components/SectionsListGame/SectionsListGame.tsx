import * as RadioGroup from "@radix-ui/react-radio-group";
import styles from "./SectionsListGame.module.scss";
import { PanelsTopLeft } from "lucide-react";

export const SectionsListGame = ({ sections }: { sections: { id: string; label: string }[] }) => (
  <section>
    <h2 className={styles.heading}>Sections</h2>
    <RadioGroup.Root defaultValue="frontend" className={styles.radioGroupRoot}>
      {sections.map((section) => (
        <RadioGroup.Item className={styles.wrapperRadio} value={section.label.toLowerCase()} id={section.id}>
          <RadioGroup.Indicator className="RadioGroupIndicator" />
          <PanelsTopLeft className={styles.radioLogo} />
          <label className={styles.radioLabel} htmlFor={section.id}>
            {section.label}
          </label>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  </section>
);
