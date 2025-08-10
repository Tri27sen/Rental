import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
//import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  // Check if the email already exists
  
  const { email, name, password } = body
  const existingUser = await prisma.user.findUnique({
    where: { email },
    include: { accounts: true } 
  });
  if (existingUser) {
    // Check if the user has any OAuth accounts
    if (existingUser.accounts && existingUser.accounts.length > 0) {
      // Get the list of providers the user has used
      const providers = existingUser.accounts.map(account => account.provider);
      
      return new Response(
        JSON.stringify({ 
          error: "OAuthAccountExists",
          message: `This email is already in use with ${providers.join(", ")}. Please sign in with that provider.`
        }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // If no OAuth accounts but user exists, it's a regular credentials account
    return new Response(
      JSON.stringify({ 
        error: "EmailExists",
        message: "This email is already registered. Please login or use a different email."
      }), 
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  
  console.log("we are in the register route ----" ,body)
  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    const user = await prisma.user.create({
      data: { email, name, hashedPassword: hashedPassword },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
}