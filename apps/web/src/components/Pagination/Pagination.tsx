import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import styles from "./Pagination.module.scss";
import Link, { LinkProps } from "next/link";
import clsx from "clsx";
import { usePagination } from "./usePagination";
import { useSearchParams } from "next/navigation";
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
  disabled?: boolean;
  href: LinkProps["href"];
} & Omit<React.ComponentProps<"a">, "href" | "ref">;

const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => {
  if (props.disabled) {
    return (
      <button
        aria-current={isActive ? "page" : undefined}
        className={clsx(className || styles.paginationNumberLink, isActive && styles.activeLink)}
        type="button"
      >
        {props.children}
      </button>
    );
  }
  return (
    <Link
      scroll={false}
      className={clsx(className || styles.paginationNumberLink, isActive && styles.activeLink)}
      {...props}
    />
  );
};
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = (props: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    aria-disabled={props.disabled}
    className={clsx(styles.paginationLink, props.disabled && styles.disabled)}
    {...props}
  >
    <ChevronLeft className={styles.paginationIcon} />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = (props: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    aria-disabled={props.disabled}
    className={clsx(styles.paginationLink, props.disabled && styles.disabled)}
    {...props}
  >
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

const ReusablePagination = ({ pages }: { pages: number }) => {
  const paginateItems = usePagination({ pages });
  const tags = useSearchParams().get("tags");
  return (
    <Pagination>
      <PaginationContent>
        {paginateItems.map(({ type, page, selected, ...props }) => (
          <PaginationItem key={`${type} ${page}`}>
            {type === "previous" && <PaginationPrevious href={{ query: { page: page, tags } }} {...props} />}
            {type === "next" && <PaginationNext href={{ query: { page: page, tags } }} {...props} />}
            {type === "ellipsis" && <PaginationEllipsis {...props} />}
            {type === "page" && (
              <PaginationLink href={{ query: { page: page, tags } }} isActive={selected} {...props}>
                {page}
              </PaginationLink>
            )}
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
