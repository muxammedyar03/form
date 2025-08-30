// 'use server'

// import prisma from "@/lib/db"
// import { getSession } from "./auth"

// export async function getPermissionForCurrentUser() {
//   const session = await getSession()
//   if (!session || !session.userId) {
//     return false
//   }

//   const user = await prisma.user.findUnique({
//     where: { id: session.userId as string },
//     select: { permission: true },
//   })

//   return user?.permission ?? false
// }
