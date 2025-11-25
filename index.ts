import { prisma } from "./prisma";

async function helloBug() {
  const users = await prisma.user.findMany({
    include: { posts: true },
    where: { id: 1 } // ok
    // where: { id: { in: [1]}} // error
  });

  const totalPosts = users.map((user) => user.posts.length);
}