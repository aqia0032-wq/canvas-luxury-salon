import { NextResponse } from "next/server";
import { addBooking, getBookings } from "@/lib/bookings-store";
import {
  adminCookieName,
  verifySessionToken,
} from "@/lib/admin-session";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      service?: string;
      date?: string;
      time?: string;
      message?: string;
    };
    const { name, email, phone, service, date, time, message } = body;
    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }
    if (!service?.trim() || !date?.trim() || !time?.trim()) {
      return NextResponse.json(
        { error: "Service, date, and time are required." },
        { status: 400 }
      );
    }
    const booking = await addBooking({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service: service.trim(),
      date: date.trim(),
      time: time.trim(),
      message: message?.trim(),
    });
    return NextResponse.json({ ok: true, id: booking.id });
  } catch {
    return NextResponse.json(
      { error: "Could not save booking." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const jar = await cookies();
  const token = jar.get(adminCookieName)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const bookings = await getBookings();
  return NextResponse.json(bookings);
}
