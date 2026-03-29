import { getStore } from "@netlify/blobs";
import { randomUUID } from "crypto";
import type { Booking, BookingStatus } from "@/lib/bookings-types";

export type { Booking, BookingStatus } from "@/lib/bookings-types";

const BOOKINGS_STORE_KEY = "bookings";
const LOGS_STORE_KEY = "appointments-log";

async function getBookingsStore() {
  try {
    return await getStore("bookings");
  } catch {
    // Fallback for local dev without Netlify context
    return null;
  }
}

export async function getBookings(): Promise<Booking[]> {
  try {
    const store = await getBookingsStore();
    if (!store) return [];

    const data = await store.get(BOOKINGS_STORE_KEY);
    if (!data) return [];

    // Convert ArrayBuffer/Buffer to string and parse JSON
    const str = typeof data === "string" ? data : new TextDecoder().decode(data);
    const parsed = JSON.parse(str) as Booking[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error reading bookings:", error);
    return [];
  }
}

export async function addBooking(
  input: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking> {
  try {
    const store = await getBookingsStore();
    if (!store) {
      throw new Error("Blob store not available");
    }

    const list = await getBookings();
    const booking: Booking = {
      ...input,
      id: randomUUID(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    list.unshift(booking);
    await store.set(BOOKINGS_STORE_KEY, JSON.stringify(list));

    // Append to log
    try {
      const existingLog = await store.get(LOGS_STORE_KEY);
      const logStr = existingLog ? (typeof existingLog === "string" ? existingLog : new TextDecoder().decode(existingLog)) : "";
      const logContent = logStr + `${JSON.stringify(booking)}\n`;
      await store.set(LOGS_STORE_KEY, logContent);
    } catch {
      // Log is best-effort
    }

    return booking;
  } catch (error) {
    console.error("Error adding booking:", error);
    throw error;
  }
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<Booking | null> {
  try {
    const store = await getBookingsStore();
    if (!store) {
      throw new Error("Blob store not available");
    }

    const list = await getBookings();
    const idx = list.findIndex((b) => b.id === id);
    if (idx === -1) return null;

    list[idx] = { ...list[idx], status };
    await store.set(BOOKINGS_STORE_KEY, JSON.stringify(list));

    // Log status update
    try {
      const existingLog = await store.get(LOGS_STORE_KEY);
      const logStr = existingLog ? (typeof existingLog === "string" ? existingLog : new TextDecoder().decode(existingLog)) : "";
      const logEntry = JSON.stringify({
        _event: "status_update",
        id,
        status,
        at: new Date().toISOString(),
        booking: list[idx],
      });
      const logContent = logStr + `${logEntry}\n`;
      await store.set(LOGS_STORE_KEY, logContent);
    } catch {
      // Log is best-effort
    }

    return list[idx];
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
}
