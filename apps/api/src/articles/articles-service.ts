import { prisma } from "../../libs/prisma/constants";

const getArticles = async () => {
  return await prisma.articles.findMany({
    select: {
      imageSrc: true,
      author: true,
      title: true,
      id: true,
    },
    where: {
      isVerified: true,
    },
  });
};

const createArticle = async ({
  title,
  url,
}: {
  imageSrc?: string;
  url: string;
  title: string;
  author?: string;
}) => {
  return await prisma.articles.create({
    data: { title, url },
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
