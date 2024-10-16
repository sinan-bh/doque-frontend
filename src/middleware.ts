import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/signin", "/signup", "/home", "/"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("user")?.value;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (!token && !publicRoutes.includes(pathname)) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  if (token && publicRoutes.includes(pathname)) {
    url.pathname = "/u/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except public ones like /signin, /signup, /home
    "/((?!signin|home|_next|favicon.ico).*)",
  ],
};
