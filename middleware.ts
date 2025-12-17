import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function getHostname(req: NextRequest) {
  const host = req.headers.get("host") ?? ""
  // Host header may include a port in dev, e.g. "localhost:3000"
  return host.split(":")[0]?.toLowerCase() ?? ""
}

export function middleware(req: NextRequest) {
  const hostname = getHostname(req)
  const { pathname } = req.nextUrl

  // Avoid double-prefixing if someone hits /pumpkin directly on the pumpkin host.
  if (hostname === "pumpkin.kothreat.us" && !pathname.startsWith("/pumpkin")) {
    const url = req.nextUrl.clone()
    url.pathname = `/pumpkin${pathname}` // "/" -> "/pumpkin/"
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  // Skip Next internals + common static assets.
  matcher: [
    "/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|xml)$).*)",
  ],
}


