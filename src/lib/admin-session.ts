import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "salon_admin_session";

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "canvas-dev-secret-change-in-production";
}

export function createSessionToken(): string {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ exp }), "utf-8").toString(
    "base64url"
  );
  const sig = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !token.includes(".")) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    ) as { exp: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const fromEnv = process.env.ADMIN_PASSWORD?.trim();
  const expected =
    fromEnv && fromEnv.length > 0 ? fromEnv : "admin123";
  const input = password.normalize("NFKC").trim();
  const exp = expected.normalize("NFKC");
  if (input.length !== exp.length) return false;
  try {
    return timingSafeEqual(
      Buffer.from(input, "utf-8"),
      Buffer.from(exp, "utf-8")
    );
  } catch {
    return false;
  }
}

export const adminCookieName = COOKIE;
