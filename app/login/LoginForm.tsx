"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/login/actions";

const initialState = { error: null as string | null };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label
          className="font-mono text-xs uppercase text-neutral-600"
          htmlFor="password"
        >
          Admin password
        </label>
        <input
          autoComplete="current-password"
          className="mt-2 h-12 w-full border border-neutral-300 px-3 font-mono text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          id="password"
          name="password"
          required
          type="password"
        />
      </div>
      {state.error && (
        <p className="font-mono text-xs text-red-700" role="alert">
          {state.error}
        </p>
      )}
      <button
        className="h-12 w-full bg-black px-4 font-mono text-xs uppercase text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
