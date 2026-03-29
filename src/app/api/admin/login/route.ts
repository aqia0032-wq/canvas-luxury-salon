import { NextResponse } from "next/server";
import {
  adminCookieName,
  createSessionToken,
  verifyAdminPassword,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    if (!verifyAdminPassword(body.password ?? "")) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = createSessionToken();
    const res = NextResponse.json({ ok: true });
    // Only use Secure cookies over HTTPS — on http://localhost (even `next start`)
    // browsers drop Secure cookies, which looks like "password never works".
    const url = new URL(request.url);
    const forwarded = request.headers.get("x-forwarded-proto");
    const secureCookie =
      forwarded === "https" || url.protocol === "https:";
    res.cookies.set(adminCookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureCookie,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
