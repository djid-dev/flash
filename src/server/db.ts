import { PrismaClient } from "@prisma/client";

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
  shortCode: string
) {
  const link = await prisma.link.findFirst({
    where: {
      shortCode,
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

export async function updateLinkClicks(shortCode: string) {
  try {
    const updatedLink = await prisma.link.update({
      where: {
        shortCode,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
    return updatedLink;
  } catch (error) {
    console.log(error);
  }
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