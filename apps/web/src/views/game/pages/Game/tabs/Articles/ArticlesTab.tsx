import { PlusCircleIcon } from "lucide-react";
import React from "react";
import Badge from "src/components/Badge/Badge";
import styles from "./ArticlesTab.module.scss";
import { Dialog } from "src/components/Dialog/Dialog";
import { Button } from "src/components/Button/Button";
export function ArticlesTab() {
  return (
    <div>
      <Dialog
        trigger={
          <button className={styles.buttonSaveArticle}>
            <Badge>
              <div className={styles.badgeWrapperInsider}>
                <PlusCircleIcon size={15} /> Save Article
              </div>
            </Badge>
          </button>
        }
        children={
          <form className={styles.articleForm}>
            <label className="sr-only" htmlFor="urlArticle">
              Url to article
            </label>
            <input
              placeholder="https://"
              name="urlArticle"
              onPaste={(e) => console.log(e.currentTarget.value)}
              type="text"
              className={styles.inputUrl}
            />
            <div className={styles.buttonWrapper}>
              <Button size="small">Get Article</Button>
            </div>
          </form>
        }
        title={"Save Article"}
      />
    </div>
  );
}
