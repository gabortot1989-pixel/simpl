import { NextResponse } from "next/server";

const PROTECTED_PATHS = ["/"];
const PASSWORD = "meltem2025";   // <<< IDE ÍRD A SAJÁT JELSZÓT

export function middleware(req) {
  const url = req.nextUrl.clone();
  const cookie = req.cookies.get("access_granted");

  // Ha már van cookie → belépve
  if (cookie?.value === "true") {
    return NextResponse.next();
  }

  // Ha a login oldalra megy → engedjük
  if (url.pathname === "/login") {
    return NextResponse.next();
  }

  // Ha védett útvonalra akar menni → dobjuk át loginra
  if (PROTECTED_PATHS.some((p) => url.pathname.startsWith(p))) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};