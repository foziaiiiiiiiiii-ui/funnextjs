import FingerprintTable from "@/app/admin/FingerprintTable";
import prisma from "@/lib/prisma";

export const instant = false;

type AdminPageProps = {
  searchParams: Promise<{ key?: string | string[] }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { key } = await searchParams;

  if (key !== "ujala123") {
    return (
      <main className="flex min-h-screen items-center bg-white px-6 text-neutral-950 md:px-12">
        <div className="w-full max-w-2xl">
          <p className="font-mono text-xs uppercase text-neutral-500">
            Ujala / Admin
          </p>
          <h1 className="mt-8 font-sans text-5xl font-semibold tracking-tighter md:text-7xl">
            Access Denied
          </h1>
          <p className="mt-4 font-mono text-sm text-neutral-600">
            This page is restricted.
          </p>
        </div>
      </main>
    );
  }

  const fingerprints = await prisma.fingerprint.findMany({
    include: {
      subscribers: {
        select: { id: true, email: true },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-white px-6 py-8 font-mono text-neutral-950 md:px-12 md:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase text-neutral-500">Ujala / Admin</p>
            <h1 className="mt-3 font-sans text-4xl font-semibold leading-none tracking-tighter md:text-6xl">
              Wishlist
              <br />
              subscribers
            </h1>
          </div>
          <div>
            <p className="text-sm text-neutral-600">
              {fingerprints.length}{" "}
              {fingerprints.length === 1 ? "profile" : "profiles"}
            </p>
          </div>
        </header>

        <FingerprintTable fingerprints={fingerprints} />
      </div>
    </main>
  );
}
