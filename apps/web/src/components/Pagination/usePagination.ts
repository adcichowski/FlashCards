import { useSearchParams } from "next/navigation";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};
const SIBLING_COUNT = 2;
const BOUNDARY_COUNT = 1;
export const usePagination = ({ pages }: { pages: number }) => {
  const page = Number(useSearchParams().get("page")) || 1;
  const startPages = range(1, Math.min(BOUNDARY_COUNT, pages));
  const endPages = range(Math.max(pages - BOUNDARY_COUNT + 1, BOUNDARY_COUNT + 1), pages);

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - SIBLING_COUNT,
      // Lower boundary when page is high
      pages - BOUNDARY_COUNT - SIBLING_COUNT - 1,
    ),
    BOUNDARY_COUNT + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + SIBLING_COUNT,
      // Upper boundary when page is low
      BOUNDARY_COUNT + SIBLING_COUNT + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : pages - 1,
  );

  const itemList = [
    ...["previous"],
    ...startPages,

    ...(siblingsStart > BOUNDARY_COUNT + 2
      ? ["ellipsis"]
      : BOUNDARY_COUNT + 1 < pages - BOUNDARY_COUNT
        ? [BOUNDARY_COUNT + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < pages - BOUNDARY_COUNT - 1
      ? ["ellipsis"]
      : pages - BOUNDARY_COUNT > BOUNDARY_COUNT
        ? [pages - BOUNDARY_COUNT]
        : []),
    ...endPages,
    ...(pages ? [] : ["next"]),
    ...["next"],
  ];
  console.log(itemList);
  return itemList.map((item) =>
    typeof item === "number"
      ? {
          type: "page",
          selected: page === item,
          "aria-current": item === page ? "true" : undefined,
          page: item,
        }
      : {
          type: item,
          selected: false,
          page: buttonPage({ type: item, page }),
          disabled: (item === "next" && page >= pages) || (item === "previous" && page <= 1),
        },
  );
};

const buttonPage = ({ type, page }: { type: string; page: number }) => {
  switch (type) {
    case "previous":
      return page - 1;
    case "next":
      return page + 1;
    default:
      return null;
  }
};
