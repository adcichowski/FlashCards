type ArticlesMapperParam = {
  Articles_Rates:
    | {
        id: string;
      }[]
    | [];
  title: string;
  imageSrc: string | null;
  url: string;
  author: string | null;
  id: string;
  createdAt: number | null;
}[];

type SumRatePerArticleType = {
  _sum: { rate: number | null };
  articleId: string;
}[];

export const mapperArticles = ({
  articles,
  sumRatesPerArticle,
}: {
  sumRatesPerArticle: SumRatePerArticleType;
  articles: ArticlesMapperParam;
}) =>
  articles.map(({ Articles_Rates, ...article }) => {
    const sumRatesInArticle = sumRatesPerArticle.find(
      (sum) => sum.articleId === article.id
    );
    console.log(sumRatesInArticle);
    return {
      rate: {
        sum: sumRatesInArticle?._sum.rate || 0,
      },
      yourRated: Articles_Rates[0],
      ...article,
    };
  });
