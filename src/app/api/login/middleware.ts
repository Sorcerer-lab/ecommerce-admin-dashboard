import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(req:NextRequest){
  const isAuth=req.cookies.get("admin-auth");
  const isAdminRoute=req.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute&&!isAuth){
    return NextResponse.redirect(new URL("/",req.url));
  }

  return NextResponse.next();
}

export const config={
  matcher:["/admin/:path*"],
};
