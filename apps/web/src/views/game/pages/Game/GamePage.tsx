"use client";
import React from "react";
import styles from "./GamePage.module.scss";
import TabsPanel, { TabChildType } from "src/components/TabsPanel/TabsPanel";
import { CardsTab } from "./tabs/Cards/CardsTab";
import { ArticlesTab } from "./tabs/Articles/ArticlesTab";
import { ExercisesTab } from "./tabs/Exercises/ExercisesTab";
import { ClubIcon, ListTodoIcon, SquareLibraryIcon } from "lucide-react";
const tabs = [
  {
    header: (
      <div className={styles.tabHeader}>
        <SquareLibraryIcon /> Articles
      </div>
    ),
    content: <ArticlesTab />,
    value: "articles",
  },
  {
    header: (
      <div className={styles.tabHeader}>
        <ClubIcon /> Cards
      </div>
    ),
    content: <CardsTab />,
    value: "cards",
  },
  {
    header: (
      <div className={styles.tabHeader}>
        <ListTodoIcon /> Exercises
      </div>
    ),
    content: <ExercisesTab />,
    value: "exercises",
  },
].map((tab) => ({
  ...tab,
  header: <div className={styles.tabHeader}>{tab.header}</div>,
  content: <div className={styles.tabContent}>{tab.content}</div>,
})) satisfies TabChildType[];

export function GamePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.selectTechnologies}>
        <div className={styles.tabPanelWrapper}>
          <TabsPanel tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
