"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "~/server/auth";
import { db } from "~/server/clients/db";
import { isAdmin } from "~/lib/is-admin";

export async function assignDinqId(
  email: string,
  dinqId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !isAdmin(session.user.email)) {
    return { ok: false, error: "Unauthorized" };
  }

  const trimmedEmail = email.trim();
  const trimmedDinqId = dinqId.trim();

  if (!trimmedEmail || !trimmedDinqId) {
    return { ok: false, error: "Email and Dinq ID are required" };
  }

  const user = await db.user.findFirst({
    where: {
      email: { equals: trimmedEmail, mode: "insensitive" },
    },
    select: { id: true },
  });

  if (!user) {
    return { ok: false, error: "User not found" };
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: { dinqId: trimmedDinqId },
    });
  } catch {
    return {
      ok: false,
      error: "Failed to assign Dinq ID — it may already be in use",
    };
  }

  revalidatePath("/admin/clients");
  revalidatePath("/admin/users");
  return { ok: true };
}
