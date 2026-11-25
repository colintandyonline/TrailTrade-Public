import type { ReactNode } from "react";

type SignalStatCardProps = {
  label: string;
  value: ReactNode;
  supporting?: string;
  tone?: "neutral" | "green" | "orange";
  surface?: "light" | "dark";
  size?: "compact" | "default" | "feature";
  className?: string;
  labelClassName?: string;
};

export function SignalStatCard(props: SignalStatCardProps) {
  const tone = props.tone ?? "neutral";
  const size = props.size ?? "default";
  const surface = props.surface ?? "light";

  const toneClasses =
    surface === "dark"
      ? tone === "green"
        ? {
            badge: "border-[#284830] bg-[#142119] text-[#9ed39f]",
            dot: "bg-[#9ed39f]",
            value: "text-[#f4f7ef]",
            border: "border-[#273629]",
            bg: "bg-[linear-gradient(180deg,#121611_0%,#191f18_100%)]",
            shadow: "shadow-[0_20px_50px_rgba(5,8,5,0.28)]",
            body: "text-[#a9b4a6]",
          }
        : tone === "orange"
          ? {
              badge: "border-[#4d3423] bg-[#231811] text-[#efb27d]",
              dot: "bg-[#d8843d]",
              value: "text-[#f6f0e9]",
              border: "border-[#3a2c22]",
              bg: "bg-[linear-gradient(180deg,#171310_0%,#1f1a16_100%)]",
              shadow: "shadow-[0_20px_50px_rgba(8,5,3,0.28)]",
              body: "text-[#baafa5]",
            }
          : {
              badge: "border-white/10 bg-white/5 text-[#cfd7c9]",
              dot: "bg-[#7f8b79]",
              value: "text-[#f5f6f2]",
              border: "border-white/8",
              bg: "bg-[linear-gradient(180deg,#111410_0%,#191d18_100%)]",
              shadow: "shadow-[0_20px_50px_rgba(5,8,5,0.26)]",
              body: "text-[#a5aea1]",
            }
      : tone === "green"
        ? {
            badge: "border-[#d7dfc6] bg-[#edf4df] text-[#6e851f]",
            dot: "bg-[#8daa38]",
            value: "text-[#24351d]",
            border: "border-[#dbe4d3]",
            bg: "bg-[linear-gradient(180deg,#fcfdf9_0%,#f4f8ec_100%)]",
            shadow: "shadow-[0_18px_40px_rgba(110,133,31,0.08)]",
            body: "text-[#596055]",
          }
        : tone === "orange"
          ? {
              badge: "border-[#f0d8c6] bg-[#fff3eb] text-[#b86e28]",
              dot: "bg-[#d8843d]",
              value: "text-[#2f241a]",
              border: "border-[#eadfd4]",
              bg: "bg-[linear-gradient(180deg,#fffaf6_0%,#fdf2e8_100%)]",
              shadow: "shadow-[0_18px_40px_rgba(216,132,61,0.08)]",
              body: "text-[#596055]",
            }
          : {
              badge: "border-[#dde3d7] bg-white text-[#5f6758]",
              dot: "bg-[#8b9485]",
              value: "text-[#161814]",
              border: "border-[#dfe5da]",
              bg: "bg-[linear-gradient(180deg,#ffffff_0%,#f7f9f4_100%)]",
              shadow: "shadow-[0_18px_40px_rgba(22,24,20,0.05)]",
              body: "text-[#596055]",
            };

  const sizeClasses =
    size === "feature"
      ? {
          wrap: "rounded-[28px] p-6 sm:p-7",
          value: "mt-6 text-[3.5rem] leading-[0.9] tracking-[-0.07em] sm:text-[4.25rem]",
          body: "mt-4 text-sm leading-7",
        }
      : size === "compact"
        ? {
            wrap: "rounded-[22px] p-4",
            value: "mt-4 text-[1.65rem] leading-none tracking-[-0.05em]",
            body: "mt-2 text-xs leading-5",
          }
        : {
            wrap: "rounded-[24px] p-5",
            value: "mt-5 text-[2.4rem] leading-none tracking-[-0.06em]",
            body: "mt-3 text-sm leading-6",
          };

  return (
    <div
      className={`${toneClasses.border} ${toneClasses.bg} ${toneClasses.shadow} ${sizeClasses.wrap} border ${props.className || ""}`.trim()}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
        <span
          className={`inline-flex w-fit max-w-full min-w-0 items-center rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase leading-[1.1] tracking-[0.14em] whitespace-normal text-left sm:px-3 sm:text-[10px] sm:tracking-[0.18em] ${toneClasses.badge} ${props.labelClassName || ""}`.trim()}
        >
          {props.label}
        </span>
        <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${toneClasses.dot}`} />
      </div>

      <div className={`${sizeClasses.value} font-black ${toneClasses.value}`}>{props.value}</div>

      {props.supporting ? (
        <p className={`${sizeClasses.body} max-w-[18rem] ${toneClasses.body}`}>
          {props.supporting}
        </p>
      ) : null}
    </div>
  );
}
