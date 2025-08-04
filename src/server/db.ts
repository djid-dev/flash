import { PrismaClient } from "../../generated/prisma/client";

export const prisma = new PrismaClient();

// export async function createNewUser(
//   email: string,
//   name: string,
//   avatarUrl: string | undefined = undefined,
//   provider: string,
//   providerId: string
// ) {
//   return await prisma.user.create({
//     data: {
//       email,
//       name,
//       avatarUrl,
//       provider,
//       providerId,
//     },
//   });
// }

export async function getUser(
  provider: string,
  providerId: string,
  email: string
) {
  const user = await prisma.user.findFirst({
    where: {
      AND: [{ provider }, { providerId }, { email }],
    },
  });
  return user;
}

export async function updateUser(userId:string, newName: string) {
  
  const newUser = await prisma.user.update({
    where:{
      id:userId
    },
    data: {
      name: newName
    }
  })

  return newUser;
}

export async function deleteUser(userId: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where:{
        id: userId
      }
    });
    return deletedUser
  } catch (error) {
    console.log(error)
  }
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

export async function deleteLink(linkId: string) {
  try {
    const deletedLink = await prisma.link.delete({
      where:{
        id: linkId
      }
    });
    return deletedLink
  } catch (error) {
    console.log(error)
  }
}