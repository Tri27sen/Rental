import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  // Check if the email already exists
  
  const { email, name, password } = body
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return new Response("Email already exists", { status: 400 });
  }
  
  console.log("we are in the register route ----" ,body)
  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
}