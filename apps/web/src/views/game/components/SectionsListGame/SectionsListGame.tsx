import styles from "./SectionsListGame.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
export const SectionsListGame = ({ sections }: { sections: { id: string; label: string }[] }) => {
  const params = useSearchParams();
  const selectedSection = params.get("section");
  return (
    <section>
      <h2 className={styles.heading}>Sections</h2>
      <ul className={styles.wrapperSections}>
        {sections.map((section) => (
          <li>
            <Link
              href={`?section=${section.label}`}
              className={clsx(styles.sectionOption, selectedSection === section.label && styles.selectedSection)}
            >
              <span className={styles.sectionLabel}>{section.label}</span>
            </Link>
          </li>
        ))}
        <li>
          <button className={styles.sectionOption}>Show More</button>
        </li>
      </ul>
    </section>
  );
};
