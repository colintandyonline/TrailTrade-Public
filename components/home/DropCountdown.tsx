"use client";

import { useEffect, useMemo, useState } from "react";

type DropCountdownProps = {
  targetISO: string | null;
  status: "live" | "scheduled" | "ended";
  scheduledLabel: string;
  viewers: string;
};

function getRemainingMs(targetISO: string | null) {
  if (!targetISO) return null;

  const target = new Date(targetISO);
  const targetMs = target.getTime();

  if (Number.isNaN(targetMs)) return null;

  return targetMs - Date.now();
}

function formatParts(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function TimeCell(props: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-white/10 bg-black/20 px-3 py-3 text-center">
      <div className="text-[10px] uppercase tracking-[0.16em] text-[#c9b59f]">{props.label}</div>
      <div className="mt-2 font-mono text-xl font-semibold text-[#e8e3d3]">{props.value}</div>
    </div>
  );
}

function formatTargetLabel(targetISO: string | null) {
  if (!targetISO) return null;

  const target = new Date(targetISO);

  if (Number.isNaN(target.getTime())) return null;

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(target);
}

export function DropCountdown(props: DropCountdownProps) {
  const [tick, setTick] = useState(Date.now());

  useEffect(() => {
    if (props.status !== "scheduled") {
      return;
    }

    const timer = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [props.status, props.targetISO]);

  const remainingMs = useMemo(() => getRemainingMs(props.targetISO), [props.targetISO, tick]);

  if (props.status === "live") {
    return (
      <div className="hidden xl:block">
        <div className="rounded-[22px] border border-[#8daa38]/20 bg-[linear-gradient(180deg,rgba(141,170,56,0.18)_0%,rgba(13,14,10,0.88)_100%)] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#dbe9ad]">Countdown</div>
          <div className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#f3efe7]">Live now</div>
          <p className="mt-2 text-sm leading-6 text-[#d1c8bb]">{props.viewers} watching the floor.</p>
          <div className="mt-4 rounded-[16px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-[#d1c8bb]">
            The room is already open, so the best move is to enter while the seller is still talking through the gear.
          </div>
        </div>
      </div>
    );
  }

  if (props.status === "ended") {
    return (
      <div className="hidden xl:block">
        <div className="rounded-[22px] border border-white/10 bg-black/35 p-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c9b59f]">Countdown</div>
          <div className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#f3efe7]">Replay ready</div>
          <p className="mt-2 text-sm leading-6 text-[#d1c8bb]">The room has closed, but the replay route is still open.</p>
          <div className="mt-4 rounded-[16px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-[#d1c8bb]">
            Use the replay to inspect details, then jump to the seller or category if you want the next piece.
          </div>
        </div>
      </div>
    );
  }

  if (remainingMs === null) {
    return (
      <div className="hidden xl:block">
        <div className="rounded-[22px] border border-white/10 bg-black/35 p-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#c9b59f]">Countdown</div>
          <div className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#f3efe7]">Coming next</div>
          <p className="mt-2 text-sm leading-6 text-[#d1c8bb]">{props.scheduledLabel}</p>
          <div className="mt-4 rounded-[16px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-[#d1c8bb]">
            The drop is on the board, and this is the place to keep it in view before it opens.
          </div>
        </div>
      </div>
    );
  }

  const parts = formatParts(remainingMs);
  const targetLabel = formatTargetLabel(props.targetISO);

  return (
    <div className="hidden xl:block">
      <div className="rounded-[22px] border border-[#8daa38]/20 bg-[linear-gradient(180deg,rgba(17,19,16,0.92)_0%,rgba(10,10,8,0.98)_100%)] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#dbe9ad]">Countdown</div>
        <div className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#f3efe7]">Starts in {parts.days} days</div>
        <p className="mt-2 text-sm leading-6 text-[#d1c8bb]">{props.scheduledLabel}</p>
        {targetLabel ? <p className="mt-1 text-xs leading-6 text-[#a9a090]">{targetLabel}</p> : null}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-4">
          <TimeCell label="Days" value={parts.days} />
          <TimeCell label="Hours" value={parts.hours} />
          <TimeCell label="Mins" value={parts.minutes} />
          <TimeCell label="Secs" value={parts.seconds} />
        </div>
        <div className="mt-4 rounded-[16px] border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-[#d1c8bb]">
          Open early, inspect the seller’s detail, and be ready when the room flips live.
        </div>
      </div>
    </div>
  );
}
