import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/signin", "/signup", "/home", "/"];
const adminRoutes = [
  "/admin/dashboard",
  "/admin/members",
  "/admin/workspace",
  "/admin/workspace/[id]",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("user")?.value;
  const adminToken = req.cookies.get("adminToken")?.value;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (!adminToken && adminRoutes.some((route) => pathname.startsWith(route))) {
    url.pathname = "/admin/adminlogin";
    return NextResponse.redirect(url);
  }

  if (adminToken) {
    // If admin is logged in
    if (pathname === "/admin/adminlogin") {
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
    if (!token && ![...publicRoutes, ...adminRoutes].includes(pathname)) {
      //if admin is logged in but not logged in as user
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  } else {
    // If both user and admin is not logged in
    if (
      !token &&
      !publicRoutes.includes(pathname) &&
      pathname !== "/admin/adminlogin"
    ) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }

    if (token && publicRoutes.includes(pathname)) {
      url.pathname = "/u/home";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all routes except public ones like /signin, /signup, /home
    "/((?!home|_next|favicon.ico|reset-password|forgot-password|verify-otp).*)",
  ],
};
