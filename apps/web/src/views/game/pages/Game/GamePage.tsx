"use client";
import React, { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { AutoComplete, AutoCompleteChangeEvent } from "primereact/autocomplete";
import { BackgroundGame } from "../../components/BackgroundGame/BackgroundGame";
import styles from "./GamePage.module.scss";

const items = [
  { label: "Cards", icon: "pi pi-fw pi-home" },
  { label: "Articles", icon: "pi pi-fw pi-calendar" },
  { label: "Exercises", icon: "pi pi-fw pi-pencil" },
];

export function GamePage() {
  const [value, setValue] = useState("");

  return (
    <div className={styles.wrapper}>
      <form role="search">
        <AutoComplete value={value} onChange={(e) => setValue(e.value)} />
      </form>
      <TabMenu model={items} />
    </div>
  );
}
