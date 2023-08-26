import getCurrentUser from "@/actions/getCurrentUser";
import getFavoritesListings from "@/actions/getFavoritesListing";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoritesListings();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="You don't have any favorited properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient currentUser={currentUser} favorites={listings} />
    </ClientOnly>
  );
};

export default ListingPage;
