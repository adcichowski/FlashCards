import { LinkIcon, ShieldCheckIcon, ShieldQuestionIcon, TerminalIcon } from "lucide-react";
import React from "react";
import Badge from "src/components/Badge/Badge";
import styles from "./ToolItem.module.scss";
import { Pencil } from "lucide-react";
import clsx from "clsx";
import { useToolVerificationToggle } from "../../hooks/useToolVerificationToggle";
import { useSession } from "next-auth/react";
export const ToolItem = ({
  name,
  tags,
  description,
  icon,
  url,
  type,
  id,
  isVerified,
  selectEditTool,
}: {
  url: string;
  type: string;
  isVerified?: boolean;
  description?: string;
  name: string;
  icon?: string;
  id: string;
  selectEditTool: (id: string) => void;
  tags: { name: string; id: string }[];
}) => {
  const session = useSession();
  console.log(session);
  const { mutate } = useToolVerificationToggle();
  return (
    <div className={styles.card}>
      <header className={styles.cardHeader}>
        {icon && <img src={icon} className={styles.cardIcon} alt="" />}
        <div className={styles.titleWrapper}>
          <h3 className={styles.cardTitle}>{name}</h3>
          <p className={styles.cardType}>{type}</p>
        </div>
      </header>
      {description && <p className={styles.cardDescription}>{description}</p>}
      <footer>
        {tags.length && (
          <ul className={styles.cardBadges}>
            {tags.map((tag) => (
              <li key={tag.id}>
                <Badge key={tag.id} name={tag.name}>
                  {tag.name}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </footer>
      <div className={styles.actionIcons}>
        {session.data?.user.role === "admin" && (
          <button
            onClick={() =>
              mutate({
                toolId: id,
                isVerified,
              })
            }
          >
            {isVerified ? (
              <>
                <ShieldCheckIcon className={clsx(styles.icon, isVerified && styles.verifiedIcon)} />{" "}
                <span aria-hidden="true" className="sr-only">
                  Verified
                </span>
              </>
            ) : (
              <>
                <ShieldQuestionIcon className={clsx(styles.icon)} />{" "}
                <span aria-hidden="true" className="sr-only">
                  Verify
                </span>
              </>
            )}
          </button>
        )}
        <a href={url} target="_blank" rel="noopener noreferrer">
          <LinkIcon className={styles.icon} />
        </a>
        {session.data?.user.role === "admin" && (
          <button onClick={() => selectEditTool(id)}>
            <Pencil className={styles.icon} />
          </button>
        )}
      </div>
    </div>
  );
};
