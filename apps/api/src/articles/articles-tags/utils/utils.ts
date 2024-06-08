export const generateFilterByTags = (tags: string[] | undefined) => {
  return tags?.length
    ? {
        Articles_Tags: {
          some: {
            Tags: {
              OR: tags.map((tag) => ({ name: tag })),
            },
          },
        },
      }
    : {};
};

export const uniqArticlesAfterFilter = <
  T extends { id: string; Articles_Tags: any[] }[],
>(
  articles: T,
  tags: string[]
) => {
  // const countedArticlesByTags = articles.reduce<
  //   Record<string, { id: string; equalTags: number }>
  // >((prev, current) => {
  //   const fundedArticle = prev[current.id];
  //   if (!fundedArticle) {
  //     return { [current.id]: { ...current, equalTags: 1 }, ...prev };
  //   }
  //   return {
  //     [current.id]: { ...current, equalTags: fundedArticle?.equalTags + 1 },
  //     ...prev,
  //   };
  // }, {});
  console.log(
    // countedArticlesByTags,
    articles.filter((v) => v.id === "2e51795d-4554-4eea-81a2-90ca8ef983bb")
  );
  return articles.filter((v) => v.Articles_Tags.length === tags.length);
  // .map(({ equalTags, ...restArticle }) => restArticle);
};
