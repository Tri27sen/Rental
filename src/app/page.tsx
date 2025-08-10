//import Image from "next/image";
export const dynamic = "force-dynamic"
import getCurrentUser from "@/app//actions/getCurrentUser"
import getListings, { IListingsParams } from "@/app/actions/getListings"
import ClientOnly from "@/app/components/ClientOnly"
import Container from "@/app/components/Container"
import EmptyState from "@/app/components/EmptyState"
import ListingCard from "@/app/components/listings/ListingCard"
import LandingHero from "@/app/components/LandingHero";
//import getCurrentUser from "@/app//actions/getCurrentUser"
interface HomeProps {
  searchParams: IListingsParams
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()
  //console.log(currentUser)
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
       <LandingHero 
       currentUser={currentUser}
       />
      <Container>
        <div
          className="
          pt-24
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
          {listings.map((listing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}