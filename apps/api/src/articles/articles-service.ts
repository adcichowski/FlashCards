import { prisma } from "../../libs/prisma/constants";

const getAllArticles = async (userId: string) => {
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
  });
};

const getVerifiedArticles = async (userId: string) => {
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

const createArticle = async ({
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

const getArticleByUrl = async (urlScrappedWeb: string) => {
  return await prisma.articles.findFirst({
    where: {
      url: urlScrappedWeb,
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
  return await prisma.articles_Rates.create({
    data: {
      articleId,
      userId,
      rate,
    },
  });
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

const findOrThrowRateForArticle = async ({
  userId,
  articleId,
}: {
  userId: string;
  articleId: string;
}) => {
  return await prisma.articles_Rates.findFirstOrThrow({
    where: {
      userId,
      articleId,
    },
  });
};

const getSumRatesPerArticle = async () => {
  return await prisma.articles_Rates.groupBy({
    by: ["articleId", "id"],
    _sum: {
      rate: true,
    },
  });
};

export const serviceArticles = {
  getAllArticles,
  createArticle,
  getArticleByUrl,
  getVerifiedArticles,
  findOrThrowRateForArticle,
  getSumRatesPerArticle,
};
