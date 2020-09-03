import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  await Promise.all([
    prisma.post.create({
      data: {
        title: "bla",
        content: "this is a sample post",
      },
    }),
    prisma.post.create({
      data: {
        title: "bla",
        content: "this is an example post",
      },
    }),
  ]);
};

const fails = async () => {
  try {
    await prisma.post.findMany({
      where: {
        content: {
          not: { contains: "sample" },
        },
      },
    });

    console.log('###fails### done')
  } catch (error) {
    console.error("Error happened ", error);
  }
};

const success = async () => {
  try {
    await prisma.post.findMany({
      where: {
        NOT: [
          {
            content: {
              contains: "sample",
            },
          },
        ],
      },
    });
    console.log('###success### done')
  } catch (error) {
    console.error("Error happened ", error);
  }
};

const exec = async () => {
  await seed();
  fails();
  success();
};

exec();
