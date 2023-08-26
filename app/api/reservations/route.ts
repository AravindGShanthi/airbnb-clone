import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await request.json();

    const { listingId, startDate, endDate, totalPrice } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
      return NextResponse.error();
    }

    const reservationAndListing = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            startDate,
            endDate,
            userId: currentUser.id,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(reservationAndListing);
  } catch (err: any) {
    return NextResponse.error();
  }
}
