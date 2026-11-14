"use server";

import { headers } from "next/headers";
import { generateUsername } from "@/lib/generateUsername";
import prisma from "@/lib/prisma";

export async function getOrCreateUser(
  screenResolution: string,
  colorDepth: string,
  timezone: string,
  language: string,
) {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ipAddress =
    forwardedFor?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "";
  const userAgent = requestHeaders.get("user-agent") ?? "";

  const existingFingerprint = await prisma.fingerprint.findFirst({
    where: {
      screenResolution,
      colorDepth,
      timezone,
      language,
      ipAddress,
      userAgent,
    },
    include: { subscribers: true },
  });

  if (existingFingerprint) {
    return existingFingerprint;
  }

  return prisma.fingerprint.create({
    data: {
      screenResolution,
      colorDepth,
      generatedUsername: generateUsername(screenResolution, colorDepth),
      timezone,
      language,
      ipAddress,
      userAgent,
    },
    include: { subscribers: true },
  });
}

export async function addSubscriber(email: string, fingerprintId: number) {
  return prisma.subscriber.create({
    data: { email: email.trim(), fingerprintId },
  });
}
