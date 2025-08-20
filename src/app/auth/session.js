import { auth } from "@/auth";
export async function Session() {
  const session = await auth();
  return session;
}
