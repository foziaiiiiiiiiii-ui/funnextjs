"use client";

import { useActionState } from "react";
import { updateAdminSettings } from "@/app/admin/settings/actions";

const initialState = { error: null as string | null, success: null as string | null };

export default function SettingsForm({
  welcomeEmailTemplate,
}: {
  welcomeEmailTemplate: string;
}) {
  const [state, formAction, isPending] = useActionState(
    updateAdminSettings,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 max-w-2xl space-y-7">
      <div>
        <label
          className="font-mono text-xs uppercase text-neutral-600"
          htmlFor="password"
        >
          New admin password
        </label>
        <input
          autoComplete="new-password"
          className="mt-2 h-12 w-full border border-neutral-300 px-3 font-mono text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          id="password"
          minLength={12}
          name="password"
          placeholder="Leave blank to keep the current password"
          type="password"
        />
        <p className="mt-2 font-mono text-[11px] text-neutral-500">
          Use at least 12 characters. Passwords are stored as scrypt hashes.
        </p>
      </div>

      <div>
        <label
          className="font-mono text-xs uppercase text-neutral-600"
          htmlFor="welcomeEmailTemplate"
        >
          Welcome email template
        </label>
        <textarea
          className="mt-2 min-h-48 w-full resize-y border border-neutral-300 p-3 font-mono text-sm leading-6 outline-none focus:border-black focus:ring-1 focus:ring-black"
          id="welcomeEmailTemplate"
          maxLength={10_000}
          name="welcomeEmailTemplate"
          required
          defaultValue={welcomeEmailTemplate}
        />
      </div>

      {state.error && (
        <p className="font-mono text-xs text-red-700" role="alert">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="font-mono text-xs text-neutral-700" role="status">
          {state.success}
        </p>
      )}
      <button
        className="h-12 bg-black px-6 font-mono text-xs uppercase text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
