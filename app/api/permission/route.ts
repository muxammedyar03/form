import { getPermissionForCurrentUser } from "@/actions/permissions"
import { NextResponse } from "next/server"

export async function GET() {
  const permission = await getPermissionForCurrentUser()
  return NextResponse.json({ permission })
}