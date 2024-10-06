"use server";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { constituency } from "@/server/db/schema/constituency";
import { Constituency } from "@/types/constituency";

export async function getConstituencyById(id: number) {
  return (
    await db.select().from(constituency).where(eq(constituency.id, id))
  )[0] as unknown as Constituency;
}
