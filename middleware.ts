import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import nextIntlConfig from "./next-intl.config";

const defaultLocale = nextIntlConfig.defaultLocale;
const handleI18nRouting = createMiddleware(nextIntlConfig);

function isRedirectToDefaultLocale(
  response: NextResponse,
  request: NextRequest
): boolean {
  if (response.status < 300 || response.status >= 400) {
    return false;
  }

  const location = response.headers.get("location");
  if (!location) {
    return false;
  }

  const redirectUrl = new URL(location, request.url);
  const defaultPath = `/${defaultLocale}`;

  return (
    redirectUrl.pathname === defaultPath ||
    redirectUrl.pathname === `${defaultPath}/`
  );
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== "/") {
    return handleI18nRouting(request);
  }

  const response = handleI18nRouting(request);

  if (isRedirectToDefaultLocale(response, request)) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/${defaultLocale}`;
    const rewriteResponse = NextResponse.rewrite(rewriteUrl);

    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      rewriteResponse.headers.set("set-cookie", setCookie);
    }

    const link = response.headers.get("link");
    if (link) {
      rewriteResponse.headers.set("link", link);
    }

    return rewriteResponse;
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/"],
};
