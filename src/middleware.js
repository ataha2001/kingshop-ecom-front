import { NextResponse } from "next/server";
import {jwtDecode} from "jwt-decode";

export function middleware(request) {
  const encryptedToken = request.cookies.get("token")?.value || "";
  const { pathname, origin } = request.nextUrl;

  const isDashboardRoute = pathname.startsWith("/dashboard");

  try {
    if (!encryptedToken) {
      if (isDashboardRoute) {
        return NextResponse.redirect(`${origin}/login`);
      }
    } else {
      const decoded = jwtDecode(encryptedToken);

      if (isDashboardRoute && decoded?.role !== "admin") {
        return NextResponse.redirect(`${origin}`);
      }

      if (pathname === "/login") {
        return NextResponse.redirect(`${origin}/dashboard`);
      }
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    // Handle cases where decoding fails or token is invalid
    if (isDashboardRoute) {
      return NextResponse.redirect(`${origin}/login`);
    }
  }

  return NextResponse.next();
}

// Configuration to apply middleware only to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/login"], // Adjust matcher based on your routes
};

// export const config = {
//     matcher:'/about/:path'
// }