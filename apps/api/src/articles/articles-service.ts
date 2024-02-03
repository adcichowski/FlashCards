import { prisma } from "../../libs/prisma/constants";

const getArticles = async () => {
  return await prisma.articles.findMany();
};
export const serviceArticles = { getArticles };
