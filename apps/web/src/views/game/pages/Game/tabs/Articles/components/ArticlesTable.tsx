import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import styles from "./ArticlesTable.module.scss";
import { useGetArticles } from "../hooks/useGetArticles";
import { convertDate } from "../../../utils/date";
import { LinkIcon, ArrowBigUpIcon, ArrowBigDownIcon, ArrowBigDown } from "lucide-react";
import clsx from "clsx";
type Article = {
  title: string;
  author: string | undefined;
  createdAt: number | undefined;
  rate: number;
  url: string;
};

const columnHelper = createColumnHelper<Article>();

const columns = [
  columnHelper.accessor("title", {
    cell: (info) => (
      <a href={info.row.original.url} className={styles.linkTitle}>
        {info.getValue()} <LinkIcon className={styles.linkIcon} />
      </a>
    ),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("rate", {
    cell: (info) => (
      <div className={styles.rateWrapper}>
        <button>
          <ArrowBigUpIcon className={clsx(styles.rateIcon, styles.increase)} />
        </button>
        {info.getValue()}
        <button>
          <ArrowBigDownIcon className={clsx(styles.rateIcon, styles.decrease)} />
        </button>
      </div>
    ),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("author", {
    header: "Author",
    cell: (info) => info.renderValue(),
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

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className={styles.headerGroup}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className={clsx(styles.header, styles[header.id])}>
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
