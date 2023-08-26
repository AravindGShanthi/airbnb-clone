import getCurrentUser from "@/actions/getCurrentUser";
import getListings, { IListingParams } from "@/actions/getListings";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const searchParamsSettings = {
    userId: searchParams?.userId || null,
    guestCount: searchParams?.guestCount || null,
    roomCount: searchParams?.roomCount || null,
    bathroomCount: searchParams?.bathroomCount || null,
    startDate: searchParams?.startDate || null,
    endDate: searchParams?.endDate || null,
    locationValue: searchParams?.locationValue || null,
    category: searchParams?.category || null,
  };
  const listings = await getListings(searchParamsSettings);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="pt-24
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
