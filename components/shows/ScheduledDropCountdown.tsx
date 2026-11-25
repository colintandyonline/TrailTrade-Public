"use client";

import { useEffect, useMemo, useState } from "react";

type ScheduledDropCountdownProps = {
  targetIso: string;
  label: string;
};

function getTimeParts(targetIso: string) {
  const targetMs = new Date(targetIso).getTime();

  if (Number.isNaN(targetMs)) {
    return null;
  }

  const diffMs = Math.max(0, targetMs - Date.now());
  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return {
    done: diffMs <= 0,
    days,
    hours,
    minutes,
  };
}

function Tile(props: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-[#d7dfc6] bg-[#edf4df] px-4 py-4 text-center text-[#5f7417]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em]">{props.label}</p>
      <p className="mt-2 text-3xl font-black tracking-[-0.04em]">{props.value}</p>
    </div>
  );
}

export default function ScheduledDropCountdown(props: ScheduledDropCountdownProps) {
  const { targetIso, label } = props;
  const [nowTick, setNowTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNowTick((value) => value + 1);
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  const parts = useMemo(() => getTimeParts(targetIso), [targetIso, nowTick]);

  if (!parts) {
    return (
      <div className="rounded-[22px] border border-[#e2e8db] bg-[#f7f9f4] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f8778]">
          Scheduled drop
        </p>
        <p className="mt-2 text-sm font-semibold text-[#161814]">{label}</p>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] border border-[#d7dfc6] bg-[linear-gradient(180deg,#f4f8eb_0%,#edf4df_100%)] p-4 text-[#161814] shadow-[0_14px_34px_rgba(95,116,23,0.08)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6b7267]">
        {parts.done ? "Drop is ready" : "Drop opens in"}
      </p>
      <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#161814]">
        {parts.done ? "The room should be live now." : "Scarcity starts when the room opens."}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#596055]">{label}</p>

      {!parts.done ? (
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Tile label="Days" value={String(parts.days).padStart(2, "0")} />
          <Tile label="Hours" value={String(parts.hours).padStart(2, "0")} />
          <Tile label="Minutes" value={String(parts.minutes).padStart(2, "0")} />
        </div>
      ) : null}
    </div>
  );
}
