"use server";
import { db } from "@/server/db";
import { candidacies_mandates } from "../db/schema/candidaciesMandates";
import { eq, desc } from "drizzle-orm";
import type { CandidacyMandate } from "@/types/candidaciesMandates";
import type { Vote } from "@/types/vote";
import { votes } from "../db/schema/votes";

export async function getMandatesofPolitician(id?: number) {
  if (!id) throw new Error("Politician ID is required");
  return (await db
    .select()
    .from(candidacies_mandates)
    .orderBy(desc(candidacies_mandates.start_date))
    .where(
      eq(candidacies_mandates.politician, id),
    )) as unknown[] as CandidacyMandate[];
}

export async function getVotesOfMandate(
  mandate: CandidacyMandate,
): Promise<Vote[]> {
  const response = await db
    .select()
    .from(votes)
    .limit(20) //---------------------------------------------------------------------------------------- LIMIT
    .where(eq(votes.mandate, mandate.id));
  return response as unknown as Vote[];
}
