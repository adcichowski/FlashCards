const STALE_NUMBER_TAKEN = 10;

export const putBoundaryPagination = (page: string | undefined) => {
  const pageNumber = Number(page) || 1;

  return {
    take: STALE_NUMBER_TAKEN,
    skip: (pageNumber - 1) * STALE_NUMBER_TAKEN,
  };
};

export const generatePagination = (total: number) => ({
  pages: Math.ceil(total / STALE_NUMBER_TAKEN),
});
