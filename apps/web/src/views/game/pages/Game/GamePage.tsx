"use client";
import React, { Fragment, createElement, useEffect, useRef } from "react";
import styles from "./GamePage.module.scss";
import TabsPanel, { TabChildType } from "src/components/TabsPanel/TabsPanel";
import Badge from "src/components/Badge/Badge";
import { useCombobox } from "downshift";
import { MultiSelectTech } from "../../components/MultiSelectTech/MultiSelectTech";
const tabs = [
  {
    header: (
      <div className={styles.tabHeader}>
        Cards <Badge>368</Badge>
      </div>
    ),
    content: <>There will be cards</>,
    value: "cards",
  },
  {
    header: (
      <div className={styles.tabHeader}>
        Articles <Badge variant="outline">18</Badge>{" "}
      </div>
    ),
    content: <>There will be articles</>,
    value: "articles",
  },
  {
    header: (
      <div className={styles.tabHeader}>
        Exercises <Badge>1</Badge>
      </div>
    ),
    content: <>There will be exercises</>,
    value: "exercises",
  },
] satisfies TabChildType[];

export function GamePage() {
  return (
    <div className={styles.wrapper}>
      <MultiSelectTech />
      <div className={styles.tabPanelWrapper}>
        <TabsPanel tabs={tabs} />
      </div>
    </div>
  );
}
