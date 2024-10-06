import axios from "axios";
import { db } from "@/server/db";
import { politicians } from "@/server/db/schema/politicians";
import type { APIPolitician, Politician } from "@/types/politician";
import { eq } from "drizzle-orm";
// Define your database connection
import { getWikiDataImageURL } from "@/server/image";
type fetchschema = {
  meta: {
    result: {
      count: number;
      total: number;
      range_start: number;
      range_end: number;
    };
  };
  data: APIPolitician[];
};

async function fetchPoliticians(Page: number, pageLimit = 100) {
  try {
    const response = await axios.get(
      "https://www.abgeordnetenwatch.de/api/v2/politicians?page=" +
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
function transformPolitician(politician: APIPolitician): Politician {
  // Example transformation: add a new field or modify an existing one
  return {
    ...politician,
    party: politician.party?.id,
    sex: politician?.sex?.slice(0, 1) as "m" | "f" | "d",
  };
}

// Define your Politician typ
// Function to sync politicians
export async function syncPoliticians() {
  const { meta } = await fetchPoliticians(1, 1);
  console.log("Politicians:" + meta.result.total);
  for (let i = 0; i < Math.ceil(meta.result.total / 1000); i += 1) {
    const { data } = await fetchPoliticians(i, 1000);
    for (const politician of data) {
      const transformatedpolitician = transformPolitician(politician);
      await db
        .insert(politicians)
        .values(transformatedpolitician)
        .onConflictDoUpdate({
          target: politicians.id,
          set: transformatedpolitician,
        })
        .catch(console.error);
      fetchWikidata(politician.id).catch(console.error);
    }
  }
}

export async function fetchWikidata(id: number) {
  const wikiid = (
    await db.select().from(politicians).where(eq(politicians.id, id))
  )[0]?.qid_wikidata;
  if (!wikiid) {
    return;
  }
  const response = fetch(
    `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikiid}&format=json`,
  ) as unknown as fetchWikischema;
  if (!response.data.entities) {
    return;
  }
  if (!response.data.entities[id]?.claims?.P18) {
    return;
  }
  const imagename =
    response.data.entities[id]?.claims?.P18[0]?.mainsnak.datavalue.value;
  if (!imagename) {
    return;
  }
  const imageurl = getWikiDataImageURL(imagename ?? "");
  console.log(imageurl);
  await db
    .update(politicians)
    .set({ profile_picture_url: imageurl })
    .where(eq(politicians.id, id));
}

type fetchWikischema = {
  data: {
    entities: Record<
      string,
      {
        claims: {
          P18: Array<{ mainsnak: { datavalue: { value: string } } }>;
        };
      }
    >;
  };
};
