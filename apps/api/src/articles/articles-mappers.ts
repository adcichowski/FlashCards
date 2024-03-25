import { generatePagination } from "utils/pagination";

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
  _sum: { rate?: number | null } | undefined;
  articleId: string;
}[];

export const mapperArticles = ({
  articles,
  ratesArticles,
  total,
}: {
  ratesArticles: SumRatePerArticleType;
  articles: ArticlesMapperParam;
  total:number
}) =>{

  const mappedArticles = articles.map(({ Articles_Rates, ...article }) => {
    const sumRatesInArticle = ratesArticles.find(
      (sum) => sum.articleId === article.id
      );
      return {
        rate: {
          sum: sumRatesInArticle?._sum?.rate || 0,
        },
        yourRated: Articles_Rates[0],
        ...article,
      };
    });
return {articles:mappedArticles,...generatePagination(total)}
  }
