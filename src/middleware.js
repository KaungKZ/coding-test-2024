// middleware.js

import { NextResponse } from "next/server";

export default function middleware(req) {
  let loggedin = req.cookies.get("userToken");
  const { pathname } = req.nextUrl;

  if (
    (loggedin && pathname === "/signin") ||
    (loggedin && pathname === "/signup")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  //   if (!loggedin && pathname !== '/signup') {
  //     return NextResponse.redirect(new URL('/signin', req.url));
  //   }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
