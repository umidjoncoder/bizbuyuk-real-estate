import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function requireAuth(request: NextRequest, pathname: string): NextResponse | null {
  // Everything under /crm except the login page needs a session cookie.
  if (pathname.startsWith("/crm") && pathname !== "/crm/login") {
    const token = request.cookies.get("crm_token")?.value;
    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/crm/login";
      loginUrl.search = "";
      return NextResponse.redirect(loginUrl);
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase();
  const isCrmHost = host.startsWith("crm.");
  const { pathname } = request.nextUrl;

  // On the crm.* subdomain, serve the /crm application transparently from root:
  //   crm.bizbuyuk.com/           -> /crm
  //   crm.bizbuyuk.com/dashboard  -> /crm/dashboard
  // API routes and Next internals are left untouched.
  if (
    isCrmHost &&
    !pathname.startsWith("/crm") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/crm" : `/crm${pathname}`;
    const authRedirect = requireAuth(request, url.pathname);
    if (authRedirect) return authRedirect;
    return NextResponse.rewrite(url);
  }

  // Normal protection for /crm on any host (e.g. bizbuyuk.com/crm too).
  const authRedirect = requireAuth(request, pathname);
  if (authRedirect) return authRedirect;

  return NextResponse.next();
}

export const config = {
  // Run on everything except static assets so the crm.* root rewrite works.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|webmanifest|xml|txt)$).*)"],
};
