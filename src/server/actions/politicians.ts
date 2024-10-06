"use server";

import { politicians } from "@/server/db/schema/politicians";
import { db } from "../db";
import { eq, and, asc, desc } from "drizzle-orm";
import type { Politician } from "@/types/politician";
import { votes } from "../db/schema/votes";
import { candidacies_mandates } from "../db/schema/candidaciesMandates";
import type { CandidacyMandate } from "@/types/candidaciesMandates";
import type { Vote } from "@/types/vote";
import { getMandatesofPolitician, getVotesOfMandate } from "./mandat";

export async function getPoliticianByName(
  firstName?: string,
  lastName?: string,
): Promise<Politician> {
  if (!firstName || !lastName) {
    throw new Error("Invalid name");
  }
  const politician: Politician = (
    await db
      .select()
      .from(politicians)
      .where(
        and(
          eq(politicians.first_name, firstName),
          eq(politicians.last_name, lastName),
        ),
      )
  )[0] as Politician;

  return politician;
}
export async function getPoliticianById(id: number): Promise<Politician> {
  return (await db
    .select()
    .from(politicians)
    .where(eq(politicians.id, id))) as unknown as Politician;
}

export async function getVotesOfPolitician(id: number): Promise<Vote[]> {
  const politician = await getPoliticianById(id);
  const votes: Vote[] = [];
  if (!politician) {
    throw new Error("Politician not found");
  }
  const mandates = await getMandatesofPolitician(id);
  for (const mandate of mandates) {
    const response = await getVotesOfMandate(mandate);
    votes.push(...response);
  }
  return votes;
}
