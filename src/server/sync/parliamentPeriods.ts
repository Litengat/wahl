import axios from "axios";
import { db } from "@/server/db";
import { undefinedDate } from "./";

import type {
  APIParliamentPeriod,
  ParliamentPeriod,
} from "@/types/parliamentPeriod";
import { parliamentPeriods } from "../db/schema/parliamentPeriods";
// Define your database connection
type fetchschema = {
  meta: {
    result: {
      count: number;
      total: number;
      range_start: number;
      range_end: number;
    };
  };
  data: APIParliamentPeriod[];
};

async function fetchParliamentPeriod(Page: number, pageLimit = 100) {
  try {
    const response = await axios.get(
      "https://www.abgeordnetenwatch.de/api/v2/parliament-periods?page=" +
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

function transformParliamentPeriod(
  parliamentPeriod: APIParliamentPeriod,
): ParliamentPeriod {
  // Example transformation: add a new field or modify an existing one
  return {
    ...parliamentPeriod,
    parliament: parliamentPeriod.parliament.id,
    previous_period: parliamentPeriod.previous_period?.id,
    election_date: undefinedDate(parliamentPeriod.election_date),
    start_date_period: new Date(parliamentPeriod.start_date_period),
    end_date_period: new Date(parliamentPeriod.end_date_period),
  };
}
// Define your Politician typ
// Function to sync politicians
export async function syncParliamentPeriods() {
  const { meta } = await fetchParliamentPeriod(1, 1);
  console.log("ParliamentPeriods:" + meta.result.total);
  for (let i = 0; i < meta.result.total / 100; i += 1) {
    const { data } = await fetchParliamentPeriod(i, 100);
    for (const period of data) {
      const transformatedperiod = transformParliamentPeriod(period);
      await db
        .insert(parliamentPeriods)
        .values(transformatedperiod)
        .onConflictDoUpdate({
          target: parliamentPeriods.id,
          set: transformatedperiod,
        });
    }
  }
}
