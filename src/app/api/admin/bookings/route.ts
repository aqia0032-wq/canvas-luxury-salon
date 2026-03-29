import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  adminCookieName,
  verifySessionToken,
} from "@/lib/admin-session";
import { isBookingId } from "@/lib/booking-validation";
import { updateBookingStatus } from "@/lib/bookings-store";
import type { BookingStatus } from "@/lib/bookings-types";

export async function PATCH(request: Request) {
  const jar = await cookies();
  const token = jar.get(adminCookieName)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { id?: string; status?: BookingStatus };
  try {
    body = (await request.json()) as { id?: string; status?: BookingStatus };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  try {
    if (!body.id || !body.status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }
    if (!isBookingId(body.id)) {
      return NextResponse.json({ error: "Invalid booking id" }, { status: 400 });
    }
    if (!["pending", "confirmed", "cancelled"].includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    const updated = await updateBookingStatus(body.id, body.status);
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
