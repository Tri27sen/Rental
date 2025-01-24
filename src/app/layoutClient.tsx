

import { User } from '@prisma/client'
import ClientOnly from '../../../my-app/src/app/components/ClientOnly'
import LoginModal from '../app/components/modals/LoginModal'
import RegisterModal from '../app/components/modals/RegisterModal'
import RentModal from '../app/components/modals/RentModal'
import Navbar from '../app/components/navbar/navbar'

export default function layoutClient({ 
  currentUser 
}: { 
  currentUser?: User | null 
}) {
  return (
    <ClientOnly>
      <LoginModal/>
      <RegisterModal/>
      <RentModal/>
      <Navbar currentUser={currentUser}/>
    </ClientOnly>
  )
}