"use client";
import React from "react";
import styles from "./BoardPage.module.scss";
import TabsPanel, { TabChildType } from "src/components/TabsPanel/TabsPanel";
import { CardsTab } from "./tabs/Cards/CardsTab";
import { ArticlesTab } from "./tabs/Articles/ArticlesTab";
import { ClubIcon, HammerIcon, SquareLibraryIcon } from "lucide-react";
import { ToolsTab } from "./tabs/Tools/ToolsTab";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
        <HammerIcon /> Tools
      </div>
    ),
    content: <ToolsTab />,
    value: "exercises",
  },
].map((tab) => ({
  ...tab,
  header: <div className={styles.tabHeader}>{tab.header}</div>,
  content: <div className={styles.tabContent}>{tab.content}</div>,
})) satisfies TabChildType[];

export function BoardPage() {
  const router = useRouter();
  const { status } = useSession();
  if (status === "unauthenticated") {
    router.push("/login");
  }
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
