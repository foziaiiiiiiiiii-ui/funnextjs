import "server-only";

import prisma from "@/lib/prisma";
import { hashAdminPassword } from "@/lib/adminPassword";

const defaultWelcomeEmailTemplate =
  "Thanks for joining the Ujala Wishlist. We’ll let you know when the app is ready.";

export async function getOrCreateAdminSettings() {
  const settings = await prisma.settings.findUnique({ where: { id: 1 } });
  if (settings) return settings;

  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
  if (!initialPassword) return null;

  return prisma.settings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      password: hashAdminPassword(initialPassword),
      welcomeEmailTemplate: defaultWelcomeEmailTemplate,
    },
    update: {},
  });
}
