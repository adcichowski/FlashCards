import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import Image from "next/image";
import { MessageCircleXIcon, ShieldQuestionIcon, SquarePen, SquarePenIcon } from "lucide-react";
import styles from "./ArticlesTable.module.scss";
import { useGetArticles } from "../../hooks/useGetArticles";
import { convertDate } from "../../../../utils/date";
import { LinkIcon, ArrowBigUpIcon, ArrowBigDownIcon, CircleXIcon } from "lucide-react";
import clsx from "clsx";
import { useManageRateArticle } from "../../hooks/useManageRateArticle";
import { ReusablePagination } from "src/components/Pagination/Pagination";
import Badge from "src/components/Badge/Badge";
import { RowAction } from "../../../../components/RowAction/RowAction";
import { useSession } from "next-auth/react";
import { useDeleteArticle } from "../../hooks/useDeleteArticle";
type Article = {
  id: string;
  faviconUrl: string | undefined;
  title: string;
  tags: { id: string; name: string }[];
  author: string | undefined;
  createdAt: number | undefined;
  rate: {
    sum: number;
  };
  yourRated?: {
    rate: number;
    id: string;
  };
  url: string;
};

const columnHelper = createColumnHelper<Article>();
const useColumns = () => {
  const { mutate: mutateDeleteArticle, isPending } = useDeleteArticle();
  const session = useSession();
  const isAdmin = session.data?.user?.role === "admin";
  return [
    columnHelper.accessor("title", {
      cell: (info) => (
        <figure className={styles.figureTitle}>
          {info.row.original.faviconUrl && (
            <Image width={30} alt="" height={30} src={info.row.original.faviconUrl} className={styles.linkTitle} />
          )}

          <figcaption>
            <a href={info.row.original.url} className={styles.linkTitle}>
              <span dangerouslySetInnerHTML={{ __html: info.getValue() }} /> <LinkIcon className={styles.linkIcon} />
            </a>
          </figcaption>
        </figure>
      ),
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("rate.sum", {
      header: () => <div className={styles.rate}>Rate</div>,
      cell: ({ getValue, row }) => {
        const { yourRated } = row.original;
        const { handleRateArticle } = useManageRateArticle({
          articleId: row.original.id,
          rateId: yourRated?.id,
          yourRated: yourRated?.rate,
        });
        return (
          <div className={styles.rateWrapper}>
            <button onClick={() => handleRateArticle({ rate: 1 })}>
              <ArrowBigUpIcon
                className={clsx(styles.rateIcon, styles.increase, yourRated?.rate === 1 && styles.activeIncrease)}
              />
            </button>
            <div className={styles.rateNumber}>{getValue()}</div>
            <button onClick={() => handleRateArticle({ rate: -1 })}>
              <ArrowBigDownIcon
                className={clsx(styles.rateIcon, styles.decrease, yourRated?.rate === -1 && styles.activeDecrease)}
              />
            </button>
          </div>
        );
      },
      footer: (info) => info.column.id,
    }),

    columnHelper.accessor("tags", {
      header: "Tags",
      cell: ({ row }) => (
        <ul className={styles.rowTags}>
          {row.original.tags.map((tag) => (
            <li key={tag.id}>
              <Badge key={tag.id} name={tag.name}>
                {tag.name}
              </Badge>
            </li>
          ))}
        </ul>
      ),
      footer: (info) => info.column.id,
    }),
    ...(isAdmin
      ? [
          columnHelper.display({
            id: "actions",
            cell: ({ row }) => (
              <RowAction
                trigger="Action"
                label="Article"
                items={[
                  {
                    name: "edit",
                    render: (
                      <button className={styles.buttonAction}>
                        <SquarePenIcon />
                        Edit
                      </button>
                    ),
                  },
                  {
                    name: "Verify",
                    render: (
                      <button className={styles.buttonAction}>
                        <ShieldQuestionIcon /> Verify
                      </button>
                    ),
                  },
                  {
                    name: "Delete",
                    render: (
                      <button
                        aria-disabled={isPending}
                        disabled={isPending}
                        onClick={() => mutateDeleteArticle({ articleId: row.original.id })}
                        className={clsx(styles.buttonAction, styles.buttonDelete)}
                      >
                        <CircleXIcon /> Delete
                      </button>
                    ),
                  },
                ]}
              />
            ),
          }),
        ]
      : []),
  ];
};
export function ArticlesTable() {
  const { data } = useGetArticles();
  const columns = useColumns();
  const table = useReactTable({
    data: data?.articles || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className={styles.sectionTable}>
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
                <td className={clsx(styles.rowCell, styles[cell.column.id])} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data?.pages && <ReusablePagination pages={data.pages} />}
    </section>
  );
}
