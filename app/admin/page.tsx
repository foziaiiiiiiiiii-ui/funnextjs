import Link from "next/link";
import { redirect } from "next/navigation";
import SignupsChart from "@/app/admin/SignupsChart";
import FingerprintTable from "@/app/admin/FingerprintTable";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

export const instant = false;

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/login");

  const today = new Date();
  const endDate = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - 29);

  const [totalSubscribers, recentSubscribers, fingerprints] = await Promise.all([
    prisma.subscriber.count(),
    prisma.subscriber.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.fingerprint.findMany({
      include: {
        subscribers: {
          select: { id: true, email: true },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const signupCounts = new Map<string, number>();
  for (const subscriber of recentSubscribers) {
    const date = subscriber.createdAt.toISOString().slice(0, 10);
    signupCounts.set(date, (signupCounts.get(date) ?? 0) + 1);
  }

  const chartData = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + index);
    const dateKey = date.toISOString().slice(0, 10);
    return {
      date: new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(date),
      signups: signupCounts.get(dateKey) ?? 0,
    };
  });

  return (
    <main className="min-h-screen bg-white px-6 py-8 font-mono text-neutral-950 md:px-12 md:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase text-neutral-500">Ujala / Admin</p>
            <h1 className="mt-3 font-sans text-4xl font-semibold leading-none tracking-tighter md:text-6xl">
              Dashboard
            </h1>
          </div>
          <Link
            className="font-mono text-xs underline underline-offset-4 hover:text-neutral-600"
            href="/admin/settings"
          >
            Settings
          </Link>
        </header>

        <section className="mb-10">
          <p className="text-xs uppercase text-neutral-500">
            Total Subscribers
          </p>
          <p className="mt-2 font-sans text-6xl font-semibold tracking-tighter md:text-8xl">
            {totalSubscribers}
          </p>
        </section>

        <section className="mb-12">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-mono text-xs uppercase text-neutral-600">
              Signups over time
            </h2>
            <span className="font-mono text-[10px] uppercase text-neutral-400">
              Last 30 days
            </span>
          </div>
          <SignupsChart data={chartData} />
        </section>

        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase text-neutral-600">
            Visitor profiles
          </h2>
          <span className="font-mono text-[10px] uppercase text-neutral-400">
            {fingerprints.length}{" "}
            {fingerprints.length === 1 ? "profile" : "profiles"}
          </span>
        </div>
        <FingerprintTable fingerprints={fingerprints} />
      </div>
    </main>
  );
}
