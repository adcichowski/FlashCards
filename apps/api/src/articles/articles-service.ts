import { prisma } from "../../libs/prisma/constants";
import { putBoundaryPagination } from "utils/pagination";
import { mapperArticles } from "./articles-mappers";
export const getAllArticles = async ({
  userId,
  page,
}: {
  userId: string;
  page: string | undefined;
}) => {
  const [ratesArticles, articles, totalArticles] = await prisma.$transaction([
    prisma.articles_Rates.groupBy({
      by: ["articleId"],
      _sum: {
        rate: true,
      },
      orderBy: undefined,
    }),
    prisma.articles.findMany({
      ...putBoundaryPagination(page),
      include: {
        
        Articles_Rates: {
          select: {
            id: true,
            rate: true,
          },
          where: {
            userId,
          },
        },
        Articles_Tags: {
          select: {
            Tags: {
              select: {
                name: true,
              },
            },
          },
        },
        
      },
      
    }),
    prisma.articles.count(),
  ]);

  return mapperArticles({
    articles,
    ratesArticles,
    total: totalArticles,
  });
};
export const getTagsPerArticle = () => {};

export const getVerifiedArticles = async (userId: string) => {
  return await prisma.articles.findMany({
    select: {
      Articles_Rates: {
        select: {
          id: true,
          rate: true,
        },
        where: {
          userId,
        },
      },
      author: true,
      title: true,
      id: true,
      imageSrc: true,
      url: true,
      createdAt: true,
    },
    where: {
      isVerified: true,
    },
  });
};

export const createArticle = async ({
  title,
  url,
  author,
  imageSrc,
}: {
  imageSrc?: string;
  url: string;
  title: string;
  author?: string;
}) => {
  return await prisma.articles.create({
    data: { title, url, author, imageSrc },
  });
};

export const getArticleByUrl = async (urlScrappedWeb: string) => {
  return await prisma.articles.findFirst({
    where: {
      url: urlScrappedWeb,
    },
  });
};

export const getArticleById = async (articleId: string) => {
  return await prisma.articles.findFirst({
    where: {
      id: articleId,
    },
  });
};

export const createRateForArticle = async ({
  rate,
  articleId,
  userId,
}: {
  articleId: string;
  rate: number;
  userId: string;
}) => {
  const createdRate = await prisma.articles_Rates.create({
    data: {
      articleId,
      userId,
      rate,
    },
  });
  return { rateId: createdRate.id };
};

export const changeRateForArticle = async ({
  rate,
  rateId,
}: {
  rate: number;
  rateId: string;
}) => {
  return await prisma.articles_Rates.update({
    data: { rate },
    where: { id: rateId },
  });
};

export const removeRateFromArticle = async ({
  articleId,
  rateId,
}: {
  rateId: string;
  articleId: string;
}) => {
  return await prisma.articles_Rates.delete({
    where: { id: rateId, articleId },
  });
};

export const findUserRateForArticle = async ({
  userId,
  articleId,
}: {
  userId: string;
  articleId: string;
}) => {
  return await prisma.articles_Rates.findFirst({
    where: {
      userId,
      articleId,
    },
  });
};

export const getSumRatesPerArticle = async () => {
  return await prisma.articles_Rates.groupBy({
    by: ["articleId"],
    _sum: {
      rate: true,
    },
  });
};

export const getRateArticle = async ({
  rateId,
  userId,
}: {
  rateId: string;
  userId: string;
}) => {
  return await prisma.articles_Rates.findFirst({
    where: {
      id: rateId,
      userId,
    },
  });
};
