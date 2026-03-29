import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message?: string;
  status: BookingStatus;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "bookings.json");

async function ensureFile(): Promise<void> {
  try {
    await mkdir(dataDir, { recursive: true });
    await readFile(filePath, "utf-8");
  } catch {
    await writeFile(filePath, "[]", "utf-8");
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
  return list[idx];
}
