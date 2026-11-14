"use server";

import { isAdminAuthenticated } from "@/lib/adminAuth";
import { hashAdminPassword } from "@/lib/adminPassword";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type SettingsFormState = {
  error: string | null;
  success: string | null;
};

export async function updateAdminSettings(
  _previousState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  if (!(await isAdminAuthenticated())) {
    return { error: "Your session has expired. Sign in again.", success: null };
  }

  const password = formData.get("password");
  const welcomeEmailTemplate = formData.get("welcomeEmailTemplate");
  if (
    typeof password !== "string" ||
    typeof welcomeEmailTemplate !== "string"
  ) {
    return { error: "Invalid settings submitted.", success: null };
  }
  if (password.length > 0 && password.length < 12) {
    return {
      error: "A new password must be at least 12 characters.",
      success: null,
    };
  }
  if (welcomeEmailTemplate.trim().length === 0) {
    return {
      error: "The welcome email template cannot be empty.",
      success: null,
    };
  }
  if (welcomeEmailTemplate.length > 10_000) {
    return {
      error: "The welcome email template must be 10,000 characters or fewer.",
      success: null,
    };
  }

  await prisma.settings.update({
    where: { id: 1 },
    data: {
      ...(password.length > 0
        ? { password: hashAdminPassword(password) }
        : {}),
      welcomeEmailTemplate,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  return { error: null, success: "Settings saved." };
}
