import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BASE_URL, PROTECTED_ROUTES, PUBLIC_ROUTES } from "./constants/routes";
import { cookies } from "next/headers";
import { verify } from "./actions/sessions";

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const cookie = cookies().get("session")?.value;
  const session = await verify(cookie);

  if (isProtectedRoute && !session) {
    let callbackUrl = pathname;
    if (search) {
      callbackUrl += search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, request.nextUrl)
    );
  }

  if (isPublicRoute && session) {
    const param = new URLSearchParams(search);
    const callbackUrl = param.get("callbackUrl");

    return NextResponse.redirect(
      new URL(callbackUrl || BASE_URL, request.nextUrl)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
