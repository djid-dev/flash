import { PrismaClient } from "../../generated/prisma/client";

export const prisma = new PrismaClient();


export async function createLink(destination: string, shortCode:string , userId:string) {
  const link = await prisma.link.create({
      data: {
        originalUrl: destination,
        shortCode: shortCode,
        userId: userId,
      },
    });
    return link;
}


export async function getLinks(userId: string) {
  const links = await prisma.link.findMany({
    where: {
      userId,
    },
  });
  return links;
}

export async function getLink(
  linkId: string
) {
  const link = await prisma.user.findFirst({
    where: {
      id: linkId,
    },
  });
  return link;
}


export async function updateLink(
  linkId: string,
  newUrl: string,
  newShortCode: string
) {
  const updatedLink = await prisma.link.update({
    where: {
      id: linkId,
    },
    data: {
      originalUrl: newUrl,
      shortCode: newShortCode,
    },
  });

  return updatedLink;
}

export async function deleteLink(linkShortCode: string) {
  try {
    const deletedLink = await prisma.link.delete({
      where:{
        shortCode: linkShortCode
      }
    });
    return deletedLink
  } catch (error) {
    console.log(error)
  }
}