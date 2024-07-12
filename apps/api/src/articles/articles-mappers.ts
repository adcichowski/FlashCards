import { generatePagination } from "utils/pagination";

type ArticlesMapperParamType = {
  url: string;
  id: string;
  title: string;
  author: string | null;
  faviconUrl: string | null;
  isVerified: boolean;
  createdAt: Date | null;
  Articles_Rates: {
    id: string;
    rate: number;
  }[];
  Articles_Tags: {
    Tags: {
      name: string;
      id: string;
    };
  }[];
}[];

type SumRatePerArticleType = {
  _sum: { rate?: number | null } | undefined;
  articleId: string;
}[];

export const mapperGetAllArticles = ({
  articles,
  ratesArticles,
  total,
}: {
  ratesArticles: SumRatePerArticleType;
  articles: ArticlesMapperParamType;
  total: number;
}) => {
  const mappedArticles = articles.map(
    ({ Articles_Rates, Articles_Tags, ...article }) => {
      const sumRatesInArticle = ratesArticles.find(
        (sum) => sum.articleId === article.id
      );
      return {
        rate: {
          sum: sumRatesInArticle?._sum?.rate || 0,
        },
        id: article.id,
        yourRated: Articles_Rates[0],
        tags: Articles_Tags.map((v) => v.Tags),
        url: article.url,
        createdAt: article.createdAt,
        author: article.author,
        faviconUrl: article.faviconUrl,
        title: article.title,
        isVerified: article?.isVerified,
      };
    }
  );
  return { articles: mappedArticles, ...generatePagination(total) };
};

export const mapperGetVerifiedArticles = ({
  articles,
  ratesArticles,
  total,
}: {
  ratesArticles: SumRatePerArticleType;
  articles: ArticlesMapperParamType;
  total: number;
}) => {
  const mappedArticles = articles.map(
    ({ Articles_Rates, Articles_Tags, ...article }) => {
      const sumRatesInArticle = ratesArticles.find(
        (sum) => sum.articleId === article.id
      );
      return {
        rate: {
          sum: sumRatesInArticle?._sum?.rate || 0,
        },
        id: article.id,
        yourRated: Articles_Rates[0],
        tags: Articles_Tags.map((v) => v.Tags),
        url: article.url,
        createdAt: article.createdAt,
        author: article.author,
        faviconUrl: article.faviconUrl,
        title: article.title,
      };
    }
  );
  return { articles: mappedArticles, ...generatePagination(total) };
};
