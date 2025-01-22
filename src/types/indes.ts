import { Listing, Reservation, User } from "@prisma/client"

export type SafeListing = Omit<Listing, "createdAt"> & { createdAt: string }
//changes type cretaedAt from listing type to string
export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string
  startDate: string
  endDate: string
  listing: SafeListing
}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}



/*Original Prisma Type:

const reservation: Reservation = {
  id: 1,
  createdAt: new Date(),
  startDate: new Date(),
  endDate: new Date(),
  listing: { id: 2, createdAt: new Date(), name: "Sample Listing" },
};
Transformed to Safe Types:




const safeReservation: SafeReservation = {
  id: 1,
  createdAt: reservation.createdAt.toISOString(),
  startDate: reservation.startDate.toISOString(),
  endDate: reservation.endDate.toISOString(),
  listing: {
    id: 2,
    createdAt: reservation.listing.createdAt.toISOString(),
    name: "Sample Listing",
  },
};
*/