import React from "react";
import styles from "./BackButton.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
function BackButton({ pathTo }: { readonly pathTo?: string }) {
  const router = useRouter();
  const handleClickBack = () => router.back();

  return (
    <>
      {pathTo ? (
        <Link passHref href={pathTo}>
          <a href={pathTo} className={styles.backButton}>
            a
          </a>
        </Link>
      ) : (
        <button className={styles.backButton} onClick={handleClickBack}></button>
      )}
    </>
  );
}
export { BackButton };
BackButton.displayName = "BackButton";
