"use server";
import type { Poll } from "@/types/poll";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { polls } from "@/server/db/schema/polls";

export async function getPollById(id: number): Promise<Poll> {
  return (
    await db.select().from(polls).where(eq(polls.id, id))
  )[0] as unknown as Poll;
}
