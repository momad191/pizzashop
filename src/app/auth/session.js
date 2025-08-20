import { auth } from "@/auth";

export default async function Session() {
  const session = await auth();
  return session;
}
