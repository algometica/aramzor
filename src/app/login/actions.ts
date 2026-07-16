"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";

function redirectTarget(formData: FormData): string {
  const callbackUrl = formData.get("callbackUrl");
  return typeof callbackUrl === "string" && callbackUrl
    ? callbackUrl
    : "/dashboard";
}

export async function login(formData: FormData) {
  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");

  if (typeof emailRaw !== "string" || !emailRaw.trim()) {
    throw new Error("Email is required");
  }

  const email = emailRaw.trim().toLowerCase();
  const password = typeof passwordRaw === "string" ? passwordRaw : "";
  const redirectTo = redirectTarget(formData);

  const adminEmail = process.env.DEV_ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.DEV_ADMIN_PASSWORD;

  // Password path: only the configured test/admin account.
  if (
    password &&
    adminEmail &&
    adminPassword &&
    email === adminEmail &&
    password === adminPassword
  ) {
    try {
      await signIn("dev-admin", {
        email,
        password,
        redirectTo,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        throw new Error("Invalid test account credentials");
      }
      throw error;
    }
    return;
  }

  // Everyone else (and admin without password): magic link.
  await signIn("resend", {
    email,
    redirectTo,
  });
}
