import axios from "axios";
import { db } from "@/server/db";
import type {
  APICandidacyMandate,
  CandidacyMandate,
} from "@/types/candidaciesMandates";
import { candidacies_mandates } from "../db/schema/candidaciesMandates";
import { undefinedDate } from "./";
type fetchschema = {
  meta: {
    result: {
      count: number;
      total: number;
      range_start: number;
      range_end: number;
    };
  };
  data: APICandidacyMandate[];
};

async function fetchCandidaciesMandates(Page: number, pageLimit = 100) {
  try {
    const response = await axios.get(
      "https://www.abgeordnetenwatch.de/api/v2/candidacies-mandates?page=" +
        Page +
        "&pager_limit=" +
        pageLimit,
    );
    const data: fetchschema = response.data as fetchschema;
    return data;
  } catch (error) {
    throw error;
  }
}
function transformCandidacyMandate(
  candidacyMandate: APICandidacyMandate,
): CandidacyMandate {
  // Example transformation: add a new field or modify an existing one
  return {
    ...candidacyMandate,
    parliament_period: candidacyMandate.parliament_period?.id,
    politician: candidacyMandate.politician?.id,
    electoral_data: {
      ...candidacyMandate.electoral_data,
      electoral_list: candidacyMandate.electoral_data?.electoral_list?.id,
      constituency: candidacyMandate.electoral_data?.constituency?.id,
    },
    start_date: undefinedDate(candidacyMandate.start_date),
    end_date: undefinedDate(candidacyMandate.end_date),
  };
}

export async function syncCandidaciesMandates() {
  const { meta } = await fetchCandidaciesMandates(1, 100);
  console.log("CandidaciesMandates:" + meta.result.total);
  for (let i = 0; i < meta.result.total / 1000; i += 1) {
    fetchsave(i).catch(console.error);
  }
}

async function fetchsave(i: number) {
  const { data } = await fetchCandidaciesMandates(i, 1000);
  for (const candidacyMandate of data) {
    const candidacy = transformCandidacyMandate(candidacyMandate);
    await db.insert(candidacies_mandates).values(candidacy).onConflictDoUpdate({
      target: candidacies_mandates.id,
      set: candidacy,
    });
  }
}
