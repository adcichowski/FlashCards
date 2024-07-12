import React from "react";
import { PlusCircleIcon } from "lucide-react";

import { SearchByTags } from "../../components/SearchByTags/SearchByTags";
import { ToolList } from "./components/ToolList/ToolList";
import styles from "./ToolsTab.module.scss";
import { Dialog } from "src/components/Dialog/Dialog";
import { FormAddTool } from "./components/FormAddTool/FormAddTool";
import { useAddTool } from "./hooks/useAddTool";
export const ToolsTab = () => {
  const { mutate } = useAddTool();
  return (
    <div>
      <SearchByTags />

      <Dialog
        trigger={
          <button className={styles.addToolButton}>
            <PlusCircleIcon size={20} /> Add Tool
          </button>
        }
        children={<FormAddTool mutate={mutate} />}
        title={"Add Tool"}
      />

      <ToolList />
    </div>
  );
};
