"use client";

import { useEffect, useRef, useState } from "react";
import { getOrCreateUser } from "@/app/actions";

export default function FingerprintInit() {
  const [welcomeName, setWelcomeName] = useState("");
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const colorDepth = String(window.screen.colorDepth);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;

    getOrCreateUser(screenResolution, colorDepth, timezone, language)
      .then((fingerprint) => {
        if (fingerprint.subscribers.length > 0) {
          setWelcomeName(fingerprint.generatedUsername);
        }
      })
      .catch((error: unknown) => {
        console.error("Could not initialize the visitor fingerprint.", error);
      });
  }, []);

  if (!welcomeName) return null;

  return (
    <p className="mb-8 font-mono text-xs text-neutral-500" role="status">
      Welcome back, {welcomeName}. Adding another email?
    </p>
  );
}
