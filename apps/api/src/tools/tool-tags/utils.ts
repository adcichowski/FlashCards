export const generateFilterByTags = (tags: string[] | undefined) => {
  return tags?.length
    ? {
        Tool_Tags: {
          some: {
            Tags: {
              OR: tags.map((tag) => ({ name: tag })),
            },
          },
        },
      }
    : {};
};
