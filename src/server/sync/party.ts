import axios from "axios";
import { db } from "@/server/db";
import type { Party } from "@/types/party";
import { parties } from "@/server/db/schema/party";
import { eq, and, isNotNull } from "drizzle-orm";
import { politicians } from "@/server/db/schema/politicians";
import type { Politician } from "@/types/politician";
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
  data: Party[];
};

async function fetchParties(Page: number, pageLimit = 100) {
  try {
    const response = await axios.get(
      "https://www.abgeordnetenwatch.de/api/v2/parties?page=" +
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
// Define your Politician typ
// Function to sync politicians
export async function syncParties() {
  const { meta } = await fetchParties(1, 1);
  console.log("Parties:" + meta.result.total);
  for (let i = 0; i < meta.result.total / 100; i += 1) {
    const { data } = await fetchParties(i, 100);
    for (const party of data) {
      await db.insert(parties).values(party).onConflictDoUpdate({
        target: parties.id,
        set: party,
      });
      const id = await getPartyWikiDataID(party.id);

      if (id) {
        await db
          .update(parties)
          .set({ qid_wikidata: id })
          .where(eq(parties.id, party.id));

        const color = await getColor(id);
        if (color) {
          await db
            .update(parties)
            .set({ color })
            .where(eq(parties.id, party.id));
        }
      }
    }
  }
}

async function getPartyWikiDataID(id: number) {
  const politicianss: Politician[] = (await db
    .select()
    .from(politicians)
    .where(
      and(eq(politicians.party, id), isNotNull(politicians.qid_wikidata)),
    )) as Politician[];
  for (const politician of politicianss) {
    if (!politician) {
      continue;
    }
    const party = await getPartyfromPolitician(politician);
    if (party) {
      return party;
    }
  }
}
//https://www.wikidata.org/w/api.php?action=wbgetentities&ids=Q49768&format=json&languages=en

type schemaPolitician = {
  data: {
    entities: Record<
      string,
      {
        claims: {
          P102: { mainsnak: { datavalue: { id: string } } }[];
        };
      }
    >;
  };
};

async function getPartyfromPolitician(politician: Politician) {
  const result: schemaPolitician = await axios.get(
    "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=" +
      politician.qid_wikidata +
      "&format=json&languages=en",
  );
  if (!politician.qid_wikidata) return;
  const entity = result.data.entities[politician.qid_wikidata];
  if (!entity?.claims?.P102?.[0]?.mainsnak) {
    return;
  }
  const mainsnak = entity.claims.P102[0].mainsnak;
  const id = (mainsnak.datavalue as unknown as { value: { id: string } }).value
    .id;
  return id;
}

async function getColor(id: string) {
  const result: schemaColor = await axios.get(
    "https://www.wikidata.org/w/api.php?action=wbgetentities&ids=" +
      id +
      "&format=json&languages=en",
  );
  const entity = result.data.entities[id];
  if (!entity?.claims) {
    return;
  }
  const claimsP465 = entity.claims.P465 as unknown as {
    mainsnak: { datavalue: { value: string } };
  }[];
  if (claimsP465 && claimsP465.length > 0) {
    const mainsnak = claimsP465?.[0]?.mainsnak;
    const color = mainsnak?.datavalue.value;
    return color;
  }
  const claimsP6364 = entity.claims.P6364 as unknown as {
    qualifiers: { P465: { datavalue: { value: string } } };
  }[];
  if (claimsP6364 && claimsP6364.length > 0) {
    const qualifiers = claimsP6364?.[0]?.qualifiers;
    if (!qualifiers) return;
    const P465 = qualifiers?.P465 as unknown as {
      datavalue: { value: string };
    }[];
    const color = P465?.[0]?.datavalue.value;
    return color;
  }
}

type schemaColor = {
  data: {
    entities: Record<
      string,
      {
        claims: {
          P465: { mainsnak: { datavalue: { value: string } }[] };
          P6364: {
            qualifiers: {
              P465: {
                hash: string;
                datavalue: { value: string; type: string };
              }[];
            };
          }[];
        };
      }
    >;
  };
};
