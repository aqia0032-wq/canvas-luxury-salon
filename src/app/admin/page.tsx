import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminCookieName,
  verifySessionToken,
} from "@/lib/admin-session";
import { getBookings } from "@/lib/bookings-store";
import { AdminBookingsClient } from "./AdminBookingsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const jar = await cookies();
  if (!verifySessionToken(jar.get(adminCookieName)?.value)) {
    redirect("/admin/login");
  }
  const bookings = await getBookings();
  return <AdminBookingsClient initial={bookings} />;
}
