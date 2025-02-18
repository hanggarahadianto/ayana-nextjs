import { NextResponse } from "next/server";

export function middleware(req: { cookies: { get: (arg0: string) => any }; url: string | URL | undefined }) {
  const token = req.cookies.get("token");

  if (token) {
    return NextResponse.redirect(new URL("/internal/sidebar/product", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: ["/login"], // Run middleware only on the login page
};
