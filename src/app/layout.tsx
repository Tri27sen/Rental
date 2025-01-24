export const dynamic = "force-dynamic"
import { Nunito } from "next/font/google"
import "./globals.css"
import Navbar from "@/app/components/navbar/navbar"
import ClientOnly from "@/app/components/ClientOnly"
import RegisterModal from "@/app/components/modals/RegisterModal"

import LoginModal from "@/app/components/modals/LoginModal"
import getCurrentUser from "@/app/actions/getCurrentUser"
import RentModal from "@/app/components/modals/RentModal"


export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
}

const font = Nunito({
  subsets: ["latin"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          
          
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}