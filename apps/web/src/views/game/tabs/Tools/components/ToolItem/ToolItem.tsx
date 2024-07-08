import { LinkIcon, TerminalIcon } from "lucide-react";
import React from "react";
import Badge from "src/components/Badge/Badge";
import styles from "./ToolItem.module.scss";
import { Pencil } from "lucide-react";
export const ToolItem = ({
  name,
  tags,
  description,
  icon,
  url,
  type,
}: {
  url: string;
  type: string;
  stars: number;
  description: string;
  name: string;
  icon: string;
  tags: { name: string; id: string }[];
}) => {
  return (
    <div className={styles.card}>
      <header className={styles.cardHeader}>
        {icon && <img src={icon} className={styles.cardIcon} alt="" />}
        <div className={styles.titleWrapper}>
          <h3 className={styles.cardTitle}>{name}</h3>
          <p className={styles.cardType}>{type}</p>
        </div>
      </header>
      <p className={styles.cardDescription}>{description}</p>
      <footer>
        <ul className={styles.cardBadges}>
          {tags.map((tag) => (
            <li>
              <Badge key={tag.id} name={tag.name}>
                {tag.name}
              </Badge>
            </li>
          ))}
        </ul>
      </footer>
      <div className={styles.actionIcons}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <LinkIcon className={styles.icon} />
        </a>
        <button>
          <Pencil className={styles.icon} />
        </button>
      </div>
    </div>
  );
};
