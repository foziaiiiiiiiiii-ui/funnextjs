import Link from "next/link";
import { redirect } from "next/navigation";
import SettingsForm from "@/app/admin/settings/SettingsForm";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

export const instant = false;

export default async function AdminSettingsPage() {
  if (!(await isAdminAuthenticated())) redirect("/login");

  const settings = await prisma.settings.findUnique({ where: { id: 1 } });
  if (!settings) {
    throw new Error("Admin settings are missing. Sign in again to initialize them.");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-neutral-950 md:px-12 md:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <Link
              className="font-mono text-xs text-neutral-600 underline underline-offset-4 hover:text-black"
              href="/admin"
            >
              Back to Dashboard
            </Link>
            <h1 className="mt-5 font-sans text-4xl font-semibold tracking-tighter md:text-6xl">
              Settings
            </h1>
          </div>
          <Link
            className="font-mono text-xs underline underline-offset-4"
            href="/admin/settings"
          >
            Settings
          </Link>
        </header>

        <SettingsForm welcomeEmailTemplate={settings.welcomeEmailTemplate} />
      </div>
    </main>
  );
}
