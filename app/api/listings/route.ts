import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    location,
    price,
    roomCount,
    bathroomCount,
    guestCount,
    category,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      locationValue: location.value,
      category,
      price: parseInt(price, 10),
      roomCount,
      bathroomCount,
      guestCount,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
