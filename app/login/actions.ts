"use server";

import { adminCookie, createAdminToken } from "@/lib/adminAuth";
import { verifyAdminPassword } from "@/lib/adminPassword";
import { getOrCreateAdminSettings } from "@/lib/adminSettings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = {
  error: string | null;
};

export async function loginAdmin(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = formData.get("password");
  if (typeof password !== "string" || password.length === 0) {
    return { error: "Enter your admin password." };
  }

  const settings = await getOrCreateAdminSettings();
  if (!settings) {
    return {
      error: "Admin login is not configured. Set ADMIN_INITIAL_PASSWORD on the server.",
    };
  }

  if (!verifyAdminPassword(password, settings.password)) {
    return { error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(adminCookie.name, createAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: adminCookie.maxAge,
  });

  redirect("/admin");
}
