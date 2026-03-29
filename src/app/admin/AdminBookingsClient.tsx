"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Booking, BookingStatus } from "@/lib/bookings-types";

type Props = { initial: Booking[] };

export function AdminBookingsClient({ initial }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function setStatus(id: string, status: BookingStatus) {
    setBusy(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = (await res.json()) as Booking;
      setRows((r) => r.map((b) => (b.id === id ? updated : b)));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="px-5 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Dashboard</p>
            <h1 className="mt-2 font-display text-4xl text-white">Bookings</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-white/15 px-6 py-2 text-xs uppercase tracking-widest text-white/70 hover:border-white/30"
          >
            Log out
          </button>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wider text-white/45">
              <tr>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Slot</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-white/45"
                  >
                    No bookings yet.
                  </td>
                </tr>
              )}
              {rows.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-white/5 text-white/80 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3 text-xs text-white/50">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-white">{b.name}</div>
                    <div className="text-xs text-white/45">{b.email}</div>
                    <div className="text-xs text-white/45">{b.phone}</div>
                  </td>
                  <td className="px-4 py-3">{b.service}</td>
                  <td className="px-4 py-3 text-xs text-gold-light/95">
                    {b.priceLabel ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {b.date} · {b.time}
                    {b.message ? (
                      <div className="mt-1 text-white/45">{b.message}</div>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      disabled={busy === b.id}
                      onChange={(e) =>
                        setStatus(b.id, e.target.value as BookingStatus)
                      }
                      aria-label={`Booking status for ${b.name}`}
                      className="rounded-lg border border-white/15 bg-black/50 px-2 py-1 text-xs capitalize"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
