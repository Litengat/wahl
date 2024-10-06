import axios from "axios";
import { db } from "@/server/db";
import { parliaments } from "../db/schema/parliaments";
import type { APIParliament, Parliament } from "@/types/parliament";
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
  data: APIParliament[];
};
function transformParliaments(parliament: APIParliament): Parliament {
  // Example transformation: add a new field or modify an existing one
  return {
    ...parliament,
    current_project: parliament.current_project?.id,
  };
}
async function fetchParliaments(Page: number, pageLimit = 100) {
  try {
    const response = await axios.get(
      "https://www.abgeordnetenwatch.de/api/v2/parliaments?page=" +
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

export async function syncParliaments() {
  const { meta } = await fetchParliaments(1, 1);
  console.log("Parliaments:" + meta.result.total);
  for (let i = 0; i < Math.ceil(meta.result.total / 1000); i += 1) {
    const { data } = await fetchParliaments(i, 1000);
    for (const parliament of data) {
      const transformatedparliament = transformParliaments(parliament);
      await db
        .insert(parliaments)
        .values(transformatedparliament)
        .onConflictDoUpdate({
          target: parliaments.id,
          set: transformatedparliament,
        })
        .catch(console.error);
    }
  }
}
