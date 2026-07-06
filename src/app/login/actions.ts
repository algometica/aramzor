"use server";

import { signIn } from "@/auth";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const callbackUrl = formData.get("callbackUrl");

  if (typeof email !== "string" || !email) {
    throw new Error("Email is required");
  }

  await signIn("resend", {
    email,
    redirectTo: typeof callbackUrl === "string" && callbackUrl ? callbackUrl : "/dashboard",
  });
}
