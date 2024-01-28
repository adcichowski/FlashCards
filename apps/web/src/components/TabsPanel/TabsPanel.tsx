"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import styles from "./TabsPanel.module.scss";

export type TabChildType = { header: JSX.Element; value: string; content: JSX.Element };
export default function TabsPanel({ tabs }: { tabs: TabChildType[] }) {
  return (
    <Tabs.Root className={styles.tabsRoot} defaultValue={tabs[0].value} orientation="vertical">
      <Tabs.List className={styles.tabsList} aria-label="tabs example">
        {tabs.map((tab) => (
          <Tabs.Trigger key={`header.${tab.value}`} className={styles.tabsTrigger} value={tab.value}>
            {tab.header}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs.map((tab) => (
        <Tabs.Content key={`content.${tab.value}`} value={tab.value}>
          {tab.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
