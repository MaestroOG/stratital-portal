import { NextResponse } from "next/server";

export function middleware(request) {
    const authToken = request.cookies.get("authToken")?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/forgot-password") || pathname.startsWith('/reset-password')) {
        return NextResponse.next();
    }

    if (!authToken) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"
    ],
};
