import axios from "axios";
import { db } from "@/server/db";
import type { APIPoll, Poll } from "@/types/poll";
import { poll_topics } from "../db/schema/pollTopics";
import { polls } from "../db/schema/polls";
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
  data: APIPoll[];
};

async function fetchPolls(Page: number, pageLimit = 100) {
  try {
    const response = await axios.get(
      "https://www.abgeordnetenwatch.de/api/v2/polls?page=" +
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
function transformPoll(poll: APIPoll): Poll {
  // Example transformation: add a new field or modify an existing one
  return {
    ...poll,
    field_legislature: poll.field_legislature?.id,
    field_poll_date: new Date(poll.field_poll_date),
  };
}

function createPollTopic(poll: APIPoll) {
  if (!poll?.field_topics) return;
  for (const topic of poll?.field_topics) {
    db.insert(poll_topics)
      .values({
        id: `${poll.id}-${topic.id}`,
        poll_id: poll.id,
        topic_id: topic.id,
      })
      .onConflictDoNothing()
      .catch(console.error);
  }
}

// Define your Politician typ
// Function to sync politicians
export async function syncPolls() {
  const { meta } = await fetchPolls(1, 1);
  console.log("Polls:" + meta.result.total);
  for (let i = 0; i < meta.result.total / 1000; i += 1) {
    const { data } = await fetchPolls(i, 1000);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(`Syncing Polls: ${i * 1000}/${meta.result.total}`);
    for (const poll of data) {
      if (poll.id === 4510) {
        console.log(poll);
      }
      const transformatedPool = transformPoll(poll);
      await db.insert(polls).values(transformatedPool).onConflictDoUpdate({
        target: polls.id,
        set: transformatedPool,
      });
      createPollTopic(poll);
    }
  }
}
