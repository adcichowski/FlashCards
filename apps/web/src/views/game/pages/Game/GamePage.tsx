"use client";
import React, { useState } from "react";
import styles from "./GamePage.module.scss";
import TabsPanel, { TabChildType } from "src/components/TabsPanel/TabsPanel";
import Badge from "src/components/Badge/Badge";
import { MultiSelectTech } from "../../components/MultiSelectTech/MultiSelectTech";
import { SectionsListGame } from "../../components/SectionsListGame/SectionsListGame";
import { fetcher } from "src/utils/fetcher";
import { CardsTab } from "./tabs/Cards/CardsTab";
import { ArticlesTab } from "./tabs/Articles/ArticlesTab";
import { ExercisesTab } from "./tabs/Exercises/ExercisesTab";

const tabs = [
  {
    header: (
      <div className={styles.tabHeader}>
        Articles <Badge variant="outline">18</Badge>{" "}
      </div>
    ),
    content: <ArticlesTab />,
    value: "articles",
  },
  {
    header: (
      <div className={styles.tabHeader}>
        Cards <Badge variant="outline">368</Badge>
      </div>
    ),
    content: <CardsTab />,
    value: "cards",
  },
  {
    header: (
      <div className={styles.tabHeader}>
        Exercises <Badge variant="outline">1</Badge>
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
      <div className={styles.selectableSections}>
        <SectionsListGame
          sections={[
            { id: "1", label: "frontend" },
            { id: "2", label: "backend" },
            { id: "3", label: "mobile" },
          ]}
        />
        <MultiSelectTech />
        {/* <input type="text" onChange={(e) => setText(e.currentTarget.value)} />
        <button type="submit" onClick={handleOnClick}>
          Submit
        </button> */}
      </div>
      <div className={styles.tabPanelWrapper}>
        <TabsPanel tabs={tabs} />
      </div>
    </div>
  );
}
