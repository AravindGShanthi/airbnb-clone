import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/prismadb";

export default async function getFavoritesListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const listings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavioritesListings = listings.map((list) => ({
      ...list,
      createdAt: list.createdAt.toISOString(),
    }));

    return safeFavioritesListings;
  } catch (err: any) {
    throw new Error(err);
  }
}
