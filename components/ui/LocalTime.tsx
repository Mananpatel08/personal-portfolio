"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/lib/data/profile";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: profile.location.timeZone,
});

/** The clock is an external source of truth, so subscribe to it rather than
 *  mirroring it into state. Returns a stable string between minute changes. */
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
const getServerSnapshot = () => "00:00";

/** Live local time in Ahmedabad. */
export function LocalTime({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <span className={className} suppressHydrationWarning>
      {time}
    </span>
  );
}
