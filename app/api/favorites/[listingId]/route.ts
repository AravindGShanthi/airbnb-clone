import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Listing ID is invalid");
  }

  const favoriteIds = [...(currentUser?.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing id");
  }

  let favoriteIds = [...(currentUser?.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
