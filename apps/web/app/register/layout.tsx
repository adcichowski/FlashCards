import React from "react";
import { BackgroundGame } from "src/views/game/components/BackgroundGame/BackgroundGame";

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return <BackgroundGame>{children}</BackgroundGame>;
}
