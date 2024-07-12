import React, { useState } from "react";
import { useGetTools } from "../../hooks/useGetTools";
import { ToolItem } from "../ToolItem/ToolItem";
import styles from "./ToolList.module.scss";
import { ReusablePagination } from "src/components/Pagination/Pagination";
import { Dialog } from "src/components/Dialog/Dialog";
import { FormEditTool } from "../FormEditTool/FormEditTool";
export const ToolList = () => {
  const { data } = useGetTools();
  const [editTool, setEditTool] = useState<string | undefined>();
  const selectEditTool = (id: string) => {
    setEditTool(id);
  };
  return (
    <>
      <ul className={styles.toolList}>
        {data?.tools.map((v) => (
          <li key={v.name}>
            <ToolItem {...v} selectEditTool={selectEditTool} />
          </li>
        ))}
      </ul>
      {data?.pages ? <ReusablePagination pages={data.pages} /> : <></>}
      <Dialog
        manage={{
          open: !!editTool,
          onOpenChange: () => {
            setEditTool(undefined);
          },
        }}
        children={<FormEditTool id={editTool} />}
        title={"Edit Tool"}
      />
    </>
  );
};
