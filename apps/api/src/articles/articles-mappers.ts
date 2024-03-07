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

export const mapperArticles = (articles: ArticlesMapperParam) =>
  articles.map(({ Articles_Rates, ...article }) => ({
    rate: Articles_Rates.reduce((prev, v) => prev + v.rate, 0),
    ...article,
  }));
