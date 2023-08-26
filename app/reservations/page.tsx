import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import ReservationClient from "./ReservationClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations"
          subtitle="You don't have any reservations for your properties"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
