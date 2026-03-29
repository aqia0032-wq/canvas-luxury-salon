import { NextResponse } from "next/server";

/** Ensures a stable middleware manifest in dev/build; headers stay in `next.config.ts`. */
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
