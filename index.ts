import { prisma } from "./prisma";

async function helloBug() {
  const data = await prisma.article.findMany({
    where: {
      status: "published",
    },
    select: {
      title: true,
      tags: {
        select: {
          label: true,
          id: true,
          slug: true,
        },
      },
    },
  });
  const tagsCount = data.map((article) => article.tags.length);
}