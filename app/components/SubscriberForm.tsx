"use client";

import { useState, type FormEvent } from "react";
import { addSubscriber, getOrCreateUser } from "@/app/actions";

export default function SubscriberForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setMessage("");
    setHasError(false);

    try {
      const screenResolution = `${window.screen.width}x${window.screen.height}`;
      const colorDepth = String(window.screen.colorDepth);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const language = navigator.language;
      const fingerprint = await getOrCreateUser(
        screenResolution,
        colorDepth,
        timezone,
        language,
      );
      await addSubscriber(email.trim(), fingerprint.id);
      setEmail("");
      setMessage("You’re on the Ujala Wishlist.");
    } catch (error) {
      console.error("Could not add wishlist subscriber.", error);
      setHasError(true);
      setMessage("Couldn’t add your email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <form
        className="flex w-full flex-col gap-2 bg-white md:flex-row"
        onSubmit={handleSubmit}
      >
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <input
          autoComplete="email"
          className="h-14 w-full min-w-0 flex-1 border-0 bg-neutral-100 px-4 font-mono text-sm text-neutral-950 outline-none placeholder:text-neutral-500 focus-visible:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-300 disabled:opacity-60"
          disabled={isSubmitting}
          id="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          required
          type="email"
          value={email}
        />
        <button
          className="h-14 w-full bg-black px-6 font-mono text-sm font-medium text-white hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-neutral-400 md:w-auto md:min-w-40"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Adding…" : "Add email"}
        </button>
      </form>
      <p
        aria-live="polite"
        className={`mt-4 min-h-5 font-mono text-xs ${hasError ? "text-red-700" : "text-neutral-600"}`}
        role={hasError ? "alert" : "status"}
      >
        {message}
      </p>
    </div>
  );
}
