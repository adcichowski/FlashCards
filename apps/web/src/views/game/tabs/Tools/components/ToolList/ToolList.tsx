import React from "react";
import { useGetTools } from "../../hooks/useGetTools";
import { ToolItem } from "../ToolItem/ToolItem";
export const ToolList = () => {
  const { data } = useGetTools();
  return (
    <ul>
      {data?.tools.map((v) => (
        <li>
          <ToolItem {...v} />
        </li>
      ))}
    </ul>
  );
};
