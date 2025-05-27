import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return new Response("Unauthorized", { status: 401 });
  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return new Response("User not found", { status: 402 });
}
