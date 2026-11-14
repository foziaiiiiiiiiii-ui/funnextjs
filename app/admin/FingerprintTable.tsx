"use client";

import { useEffect, useState } from "react";

type FingerprintRow = {
  id: number;
  generatedUsername: string;
  ipAddress: string;
  timezone: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  subscribers: Array<{ id: number; email: string }>;
};

type FingerprintTableProps = {
  fingerprints: FingerprintRow[];
};

export default function FingerprintTable({
  fingerprints,
}: FingerprintTableProps) {
  const [selected, setSelected] = useState<FingerprintRow | null>(null);

  useEffect(() => {
    if (!selected) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left font-mono">
          <thead className="bg-neutral-100 text-neutral-500">
            <tr>
              <th className="w-[24%] whitespace-nowrap px-5 py-4 text-left text-xs font-medium uppercase">
                Username
              </th>
              <th className="w-[22%] whitespace-nowrap px-5 py-4 text-left text-xs font-medium uppercase">
                IP address
              </th>
              <th className="w-[22%] whitespace-nowrap px-5 py-4 text-left text-xs font-medium uppercase">
                Timezone
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-left text-xs font-medium uppercase">
                Emails
              </th>
            </tr>
          </thead>
          <tbody>
            {fingerprints.map((fingerprint) => (
              <tr
                className="odd:bg-white even:bg-neutral-50 hover:bg-neutral-100"
                key={fingerprint.id}
              >
                <td className="px-5 py-4 text-sm">
                  <button
                    className="font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() => setSelected(fingerprint)}
                    type="button"
                  >
                    {fingerprint.generatedUsername}
                  </button>
                </td>
                <td className="px-5 py-4 text-xs">
                  {fingerprint.ipAddress || "UNAVAILABLE"}
                </td>
                <td className="px-5 py-4 text-xs">
                  {fingerprint.timezone}
                </td>
                <td className="px-5 py-4 text-xs">
                  {fingerprint.subscribers.length}{" "}
                  {fingerprint.subscribers.length === 1 ? "email" : "emails"}
                </td>
              </tr>
            ))}
            {fingerprints.length === 0 && (
              <tr>
                <td className="px-5 py-12 text-center text-sm" colSpan={4}>
                  No fingerprints yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close user details"
            className="absolute inset-0 size-full cursor-default bg-black/50"
            onClick={() => setSelected(null)}
            type="button"
          />
          <aside
            aria-labelledby="fingerprint-detail-title"
            aria-modal="true"
            className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-white shadow-2xl"
            role="dialog"
          >
            <header className="flex items-start justify-between p-5 md:p-8">
              <div className="min-w-0 pr-4">
                <p className="font-mono text-xs uppercase text-neutral-500">
                  Visitor details
                </p>
                <h2
                  className="mt-3 break-words font-sans text-3xl font-semibold leading-none tracking-tighter md:text-5xl"
                  id="fingerprint-detail-title"
                >
                  {selected.generatedUsername}
                </h2>
              </div>
              <button
                aria-label="Close details"
                className="flex size-10 shrink-0 items-center justify-center font-mono text-xl text-neutral-500 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => setSelected(null)}
                type="button"
              >
                X
              </button>
            </header>

            <div className="flex-1 space-y-8 overflow-y-auto px-5 pb-8 font-mono md:px-8">
              <section>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xs font-medium uppercase text-neutral-500">
                    Email addresses
                  </h3>
                  <span className="text-xs text-neutral-500">
                    {selected.subscribers.length} total
                  </span>
                </div>
                <ul className="mt-3 space-y-2">
                  {selected.subscribers.length > 0 ? (
                    selected.subscribers.map((subscriber) => (
                      <li
                        className="break-all bg-neutral-50 px-3 py-2 text-sm"
                        key={subscriber.id}
                      >
                        {subscriber.email}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-sm uppercase">
                      No email addresses added.
                    </li>
                  )}
                </ul>
              </section>

              <section>
                <h3 className="text-xs font-medium uppercase text-neutral-500">
                  Device and locale
                </h3>
                <dl className="mt-3 space-y-3">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                    <dt className="text-xs text-neutral-500">
                      Screen resolution
                    </dt>
                    <dd className="break-all text-right text-xs">
                      {selected.screenResolution}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                    <dt className="text-xs text-neutral-500">Language</dt>
                    <dd className="break-all text-right text-xs">
                      {selected.language}
                    </dd>
                  </div>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                    <dt className="text-xs text-neutral-500">Timezone</dt>
                    <dd className="break-all text-right text-xs">
                      {selected.timezone}
                    </dd>
                  </div>
                </dl>
              </section>

              <section>
                <h3 className="text-xs font-medium uppercase text-neutral-500">
                  User agent
                </h3>
                <p className="mt-3 break-all bg-neutral-50 p-3 text-xs leading-6">
                  {selected.userAgent || "UNAVAILABLE"}
                </p>
              </section>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
