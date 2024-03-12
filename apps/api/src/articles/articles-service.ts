import { prisma } from "../../libs/prisma/constants";

const getAllArticles = async () => {
  return await prisma.articles.findMany({
    select: {
      Articles_Rates: true,
      author: true,
      title: true,
      id: true,
      imageSrc: true,
      url: true,
      createdAt: true,
    },
  });
};

const getVerifiedArticles = async () => {
  return await prisma.articles.findMany({
    select: {
      Articles_Rates: true,
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
export const serviceArticles = {
  getAllArticles,
  createArticle,
  getArticleByUrl,
  getVerifiedArticles,
};
