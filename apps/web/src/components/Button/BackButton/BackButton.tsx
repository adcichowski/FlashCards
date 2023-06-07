import React from "react";
import styles from "./BackButton.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
function BackButton({ pathTo, text = "back" }: { readonly pathTo?: string; readonly text?: string }) {
  const router = useRouter();
  const handleClickBack = () => router.back();

  return (
    <>
      {pathTo ? (
        <Link href={pathTo} className={styles.backButton}>
          {text}
        </Link>
      ) : (
        <button aria-label="back" className={styles.backButton} onClick={handleClickBack}></button>
      )}
    </>
  );
}
export { BackButton };
BackButton.displayName = "BackButton";
