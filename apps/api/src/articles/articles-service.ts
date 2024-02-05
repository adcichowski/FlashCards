import { prisma } from "../../libs/prisma/constants";

const getArticles = async () => {
  return await prisma.articles.findMany();
};

const createArticle = async (article: {
  imageSrc: string;
  url: string;
  title: string;
}) => {
  return await prisma.articles.create({
    data: article,
  });
};

const getArticleByUrl = async (urlScrappedWeb: string) => {
  return await prisma.articles.findFirst({
    where: {
      url: urlScrappedWeb,
    },
  });
};
export const serviceArticles = { getArticles, createArticle, getArticleByUrl };
