import { readFile, writeFile, mkdir, appendFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import type { Booking, BookingStatus } from "@/lib/bookings-types";

export type { Booking, BookingStatus } from "@/lib/bookings-types";

/** Project-root `data/` — all appointment records stay on this machine’s disk. */
export const BOOKINGS_DATA_DIR = path.join(process.cwd(), "data");
const filePath = path.join(BOOKINGS_DATA_DIR, "bookings.json");
const appendLogPath = path.join(BOOKINGS_DATA_DIR, "appointments-log.jsonl");

async function ensureFile(): Promise<void> {
  try {
    await mkdir(BOOKINGS_DATA_DIR, { recursive: true });
    await readFile(filePath, "utf-8");
  } catch {
    await writeFile(filePath, "[]", "utf-8");
  }
}

async function appendBookingToLocalLog(booking: Booking): Promise<void> {
  try {
    await mkdir(BOOKINGS_DATA_DIR, { recursive: true });
    await appendFile(appendLogPath, `${JSON.stringify(booking)}\n`, "utf-8");
  } catch {
    // Authoritative store is bookings.json; log is a best-effort backup.
  }
}

async function appendStatusChangeToLocalLog(
  id: string,
  status: BookingStatus,
  booking: Booking
): Promise<void> {
  try {
    await mkdir(BOOKINGS_DATA_DIR, { recursive: true });
    await appendFile(
      appendLogPath,
      `${JSON.stringify({
        _event: "status_update",
        id,
        status,
        at: new Date().toISOString(),
        booking,
      })}\n`,
      "utf-8"
    );
  } catch {
    // best-effort; bookings.json is authoritative
  }
}

export async function getBookings(): Promise<Booking[]> {
  await ensureFile();
  const raw = await readFile(filePath, "utf-8");
  try {
    const parsed = JSON.parse(raw) as Booking[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addBooking(
  input: Omit<Booking, "id" | "status" | "createdAt">
): Promise<Booking> {
  await ensureFile();
  const list = await getBookings();
  const booking: Booking = {
    ...input,
    id: randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  list.unshift(booking);
  await writeFile(filePath, JSON.stringify(list, null, 2), "utf-8");
  await appendBookingToLocalLog(booking);
  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<Booking | null> {
  const list = await getBookings();
  const idx = list.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], status };
  await writeFile(filePath, JSON.stringify(list, null, 2), "utf-8");
  await appendStatusChangeToLocalLog(id, status, list[idx]);
  return list[idx];
}
