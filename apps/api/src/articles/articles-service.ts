import { prisma } from "../../libs/prisma/constants";
import { putBoundaryPagination } from "utils/pagination";
import { mapperArticles } from "./articles-mappers";
import { generateFilterByTags } from "./articles-tags/utils/utils";
import { InferType } from "yup";
import { editArticleSchema } from "./articles-schema";
export const getAllArticles = async ({
  userId,
  page,
  tags,
}: {
  verified?: boolean;
  userId: string;
  page: string | undefined;
  tags: string[] | undefined;
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
          include: {
            Tags: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: generateFilterByTags(tags),
    }),
    prisma.articles.count({
      where: generateFilterByTags(tags),
    }),
  ]);
  return mapperArticles({
    articles: articles,
    ratesArticles,
    total: totalArticles,
  });
};

export const getVerifiedArticles = async ({
  userId,
  page,
  tags,
}: {
  verified?: boolean;
  userId: string;
  page: string | undefined;
  tags: string[] | undefined;
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
          include: {
            Tags: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: {
        ...generateFilterByTags(tags),
        isVerified: true,
      },
    }),
    prisma.articles.count({
      where: {
        ...generateFilterByTags(tags),
        isVerified: true,
      },
    }),
  ]);
  return mapperArticles({
    articles: articles,
    ratesArticles,
    total: totalArticles,
  });
};

export const createArticle = async ({
  title,
  url,
  author,
  faviconUrl,
}: {
  faviconUrl?: string;
  url: string;
  title: string;
  author?: string;
}) => {
  return await prisma.articles.create({
    data: { title, url, author, faviconUrl },
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
  const article = await prisma.articles.findFirst({
    include: {
      Articles_Tags: {
        include: {
          Tags: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      id: articleId,
    },
  });
  if (!article) return;
  return {
    id: article.id,
    url: article.url,
    title: article.title,
    faviconUrl: article.faviconUrl,
    isVerified: article.isVerified,
    author: article.author,
    tags: article.Articles_Tags.map((v) => v.Tags),
  };
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

export const deleteArticle = async (articleId: string) => {
  await prisma.$transaction([
    prisma.articles_Rates.deleteMany({ where: { articleId } }),
    prisma.articles_Tags.deleteMany({ where: { articleId } }),
    prisma.articles.delete({
      where: {
        id: articleId,
      },
    }),
  ]);
};

export const editArticle = async ({
  articleId,
  ...editDataArticle
}: InferType<typeof editArticleSchema> & { articleId: string }) => {
  const articleTags = await prisma.articles_Tags.findMany({
    where: { articleId },
  });

  const receivedTags = editDataArticle.tags?.map((tag) => tag.id) || [];
  const tagsFromDatabase = articleTags.map((v) => v.tagId);
  const uniqTags = [...new Set([...receivedTags, ...tagsFromDatabase])];

  const actionPerTag = uniqTags.reduce<{ deleted: string[]; added: string[] }>(
    (prev, v) => {
      if (!receivedTags.includes(v) && tagsFromDatabase.includes(v)) {
        return { ...prev, deleted: [...prev.deleted, v] };
      }
      if (receivedTags.includes(v) && !tagsFromDatabase.includes(v)) {
        return { ...prev, added: [...prev.added, v] };
      }
      return prev;
    },
    {
      deleted: [],
      added: [],
    }
  );

  await prisma.$transaction([
    prisma.articles_Tags.deleteMany({
      where: {
        OR: actionPerTag.deleted.map((tagId) => ({ tagId })),
        articleId,
      },
    }),
    prisma.articles_Tags.createMany({
      data: actionPerTag.added.map((tagId) => ({ articleId, tagId })),
    }),
  ]);
};
