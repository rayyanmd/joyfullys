import { NextRequest, NextResponse as res } from "next/server";

export async function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return;

  if (req.headers.get("Authorization") == `Basic ${process.env.ADMIN_SECRET}`)
    return res.next();

  return res.json(
    { success: false },
    {
      status: 401,
      headers: {
        "WWW-Authenticate": "Basic",
      },
    }
  );
}
