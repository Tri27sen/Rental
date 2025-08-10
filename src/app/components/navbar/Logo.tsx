"use client"
import { FC } from "react"
import Image from "next/image"
//Observar que aqui é do next navigation
import { useRouter } from "next/navigation"


interface LogoProps {}
const Logo: FC<LogoProps> = ({}) => {
  const router = useRouter()
  return (
    <span 
      onClick={() => router.push("/")} 
      className="hidden md:block cursor-pointer text-3xl font-bold"
    >
      <span className="text-blue-600">Nest</span>
      <span className="text-black">Hive</span>
    </span>
  )
}

export default Logo