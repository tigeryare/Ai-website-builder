import { type NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  // Add protected routes logic here if needed
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
