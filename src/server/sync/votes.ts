import axios from "axios";
import { db } from "@/server/db";
import { politicians } from "@/server/db/schema/politicians";
import type { APIVote, Vote } from "@/types/vote";
import { votes } from "../db/schema/votes";
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
  data: APIVote[];
};

async function fetchVotes(Page: number, pageLimit = 100) {
  try {
    const data = (await fetch(
      "https://www.abgeordnetenwatch.de/api/v2/votes?page=" +
        Page +
        "&pager_limit=" +
        pageLimit,
    ).then((response) => response.json())) as fetchschema;
    return data;
  } catch (error) {
    console.log("fetcherror");
    throw error;
  }
}

function transformVotes(vote: APIVote): Vote {
  // Example transformation: add a new field or modify an existing one
  return {
    ...vote,
    mandate: vote.mandate?.id,
    poll: vote.poll?.id,
  };
}

// Define your Politician typ
// Function to sync politicians
export async function syncVotes() {
  const { meta } = await fetchVotes(1, 1);
  console.log("Votes:" + meta.result.total);
  for (let i = 0; i < Math.ceil(meta.result.total / 1000); i += 1) {
    const { data } = await fetchVotes(i, 1000);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`Syncing Votes: ${i * 1000}/${meta.result.total}`);

    for (const vote of data) {
      const transformatedvote = transformVotes(vote);
      db.insert(votes)
        .values(transformatedvote)
        .onConflictDoUpdate({
          target: politicians.id,
          set: transformatedvote,
        })
        .catch(console.error);
    }
  }
}
