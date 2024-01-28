"use client";
import React, { Fragment, createElement, useEffect, useRef } from "react";
import styles from "./GamePage.module.scss";
import TabsPanel, { TabChildType } from "src/components/TabsPanel/TabsPanel";
import Badge from "src/components/Badge/Badge";
import { useCombobox } from "downshift";
import { MultipleSelectTech } from "../../components/MultiSelectTech/MultiSelectTech";
const tabs = [
  {
    header: (
      <div className={styles.tabHeaderWrapper}>
        Cards <Badge value={368} />
      </div>
    ),
    content: <>There will be cards</>,
    value: "cards",
  },
  {
    header: (
      <div className={styles.tabHeaderWrapper}>
        Articles <Badge value={18} />{" "}
      </div>
    ),
    content: <>There will be articles</>,
    value: "articles",
  },
  {
    header: (
      <div className={styles.tabHeaderWrapper}>
        Exercises <Badge value={1} />
      </div>
    ),
    content: <>There will be exercises</>,
    value: "exercises",
  },
] satisfies TabChildType[];

export function GamePage() {
  return (
    <div className={styles.wrapper}>
      <MultipleSelectTech />
      <TabsPanel tabs={tabs} />
    </div>
  );
}
