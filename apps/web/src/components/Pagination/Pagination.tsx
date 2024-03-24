import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import styles from "./Pagination.module.scss";
import Link, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { usePagination } from "./usePagination";
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav role="navigation" aria-label="pagination" className={styles.pagination} {...props} />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => <ul ref={ref} className={styles.paginationContent} {...props} />,
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  href: LinkProps["href"];
} & Omit<React.ComponentProps<"a">, "href" | "ref">;

const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    className={clsx(className || styles.paginationNumberLink)}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = (props: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" className={styles.paginationLink} {...props}>
    <ChevronLeft className={styles.paginationIcon} />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = (props: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" className={styles.paginationLink} {...props}>
    <span>Next</span>
    <ChevronRight className={styles.paginationIcon} />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={styles.paginationEllipsis} {...props}>
    <MoreHorizontal className={styles.paginationIcon} />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const ReusablePagination = () => {
  const paginateItems = usePagination({ pages: 20 });
  console.log(paginateItems);
  return (
    <Pagination>
      <PaginationContent>
        {paginateItems.map((item) => (
          <PaginationItem>
            {item.type === "previous" && <PaginationPrevious href={{ query: { page: item.page } }} />}
            {item.type === "next" && <PaginationNext href={{ query: { page: item.page } }} />}
            {item.type === "ellipsis" && <PaginationEllipsis />}
            {item.type === "page" && <PaginationLink href={{ query: { page: item.page } }}>{item.page}</PaginationLink>}
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export {
  ReusablePagination,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
