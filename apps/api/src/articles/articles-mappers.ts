type ArticlesMapperParam = {
  Articles_Rates: {
    id: string;
    rate: number;
    userId: string;
    articleId: string;
  }[];
  title: string;
  imageSrc: string | null;
  url: string;
  author: string | null;
  id: string;
  createdAt: number | null;
}[];

export const mapperArticles = ({
  userId,
  articles,
}: {
  articles: ArticlesMapperParam;
  userId: string;
}) =>
  articles.map(({ Articles_Rates, ...article }) => {
    const userRate = Articles_Rates.find((v) => v.userId === userId);
    return {
      rate: Articles_Rates.reduce((prev, v) => prev + v.rate, 0),
      yourRate: userRate ? { id: userRate.id, rate: userRate.rate } : null,
      ...article,
    };
  });
