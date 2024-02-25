import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import styles from "./ArticlesTable.module.scss";
import { useGetArticles } from "../hooks/useGetArticles";
import { convertDate } from "../../../utils/date";
type Article = {
  title: string;
  author: string | undefined;
  createdAt: number | undefined;
};

const columnHelper = createColumnHelper<Article>();

const columns = [
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
    size: 10,
  }),

  columnHelper.accessor("author", {
    header: "Author",
    cell: (info) => info.renderValue(),
    size: 200,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (cell) => {
      const timestamp = cell.getValue();
      return <>{timestamp ? convertDate(timestamp) : "N/A"}</>;
    },
  }),
];

export function ArticlesTable() {
  const { data } = useGetArticles();

  const table = useReactTable({
    data: data?.articles || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  if (!data) return <>No data</>;

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className={styles.headerGroup}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={styles.header}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className={styles.row}>
            {row.getVisibleCells().map((cell) => (
              <td className={styles.rowCell} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
