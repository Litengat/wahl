import axios from "axios";
import { db } from "@/server/db";
import type { Constituency, APIConstituency } from "@/types/constituency";
import { constituency } from "../db/schema/constituency";
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
  data: APIConstituency[];
};

async function fetchConstituency(Page: number, pageLimit = 100) {
  try {
    const response = await axios.get(
      "https://www.abgeordnetenwatch.de/api/v2/constituencies?page=" +
        Page +
        "&pager_limit=" +
        pageLimit,
    );
    const data: fetchschema = response.data as fetchschema;
    return data;
  } catch (error) {
    console.log("fetcherror");
    throw error;
  }
}
function transformConstituency(politician: APIConstituency): Constituency {
  // Example transformation: add a new field or modify an existing one
  return {
    ...politician,
    // is never used
    parliament_period: politician.parliament_period?.id,
  };
}

// Define your Politician typ
// Function to sync politicians
export async function syncConstituency() {
  const { meta } = await fetchConstituency(1, 1);
  console.log("Constituency:" + meta.result.total);
  for (let i = 0; i < Math.ceil(meta.result.total / 1000); i += 1) {
    const { data } = await fetchConstituency(i, 1000);
    for (const Constituency of data) {
      const transformatedConstituency = transformConstituency(Constituency);
      await db
        .insert(constituency)
        .values(transformatedConstituency)
        .onConflictDoUpdate({
          target: constituency.id,
          set: transformatedConstituency,
        })
        .catch(console.error);
    }
    //console.log(data);
  }
}
