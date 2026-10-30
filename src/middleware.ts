import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  const isDefaultHost =
    hostname.includes("localhost") ||
    hostname.includes("127.0.0.1") ||
    hostname.includes("vercel.app");

  if (
    url.pathname.startsWith("/creador") ||
    url.pathname.startsWith("/p/") ||
    url.pathname.startsWith("/politica-") ||
    url.pathname.startsWith("/terminos-")
  ) {
    return NextResponse.next();
  }

  if (!isDefaultHost) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-custom-domain", hostname.replace(/^www\./, "").toLowerCase());
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}
