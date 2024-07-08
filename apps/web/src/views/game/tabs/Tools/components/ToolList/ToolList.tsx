import React from "react";
import { useGetTools } from "../../hooks/useGetTools";
import { ToolItem } from "../ToolItem/ToolItem";
import styles from "./ToolList.module.scss";
import { ReusablePagination } from "src/components/Pagination/Pagination";
export const ToolList = () => {
  const { data } = useGetTools();
  return (
    <>
      <ul className={styles.toolList}>
        {data?.tools.map((v) => (
          <li key={v.id}>
            <ToolItem {...v} />
          </li>
        ))}
      </ul>
      {data?.pages ? <ReusablePagination pages={data.pages} /> : <></>}
    </>
  );
};
