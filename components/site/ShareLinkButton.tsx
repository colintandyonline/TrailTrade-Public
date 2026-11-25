"use client";

import { useState } from "react";

type ShareLinkButtonProps = {
  url: string;
  label?: string;
  className?: string;
};

export function ShareLinkButton(props: ShareLinkButtonProps) {
  const { url, label = "Share your store", className } = props;
  const [status, setStatus] = useState<"idle" | "done">("idle");

  async function handleShare() {
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ url });
      } else if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        throw new Error("Sharing is not available.");
      }

      setStatus("done");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setStatus("done");
        window.setTimeout(() => setStatus("idle"), 2200);
      }
    }
  }

  return (
    <button type="button" onClick={() => void handleShare()} className={className}>
      {status === "done" ? "Link copied" : label}
    </button>
  );
}
