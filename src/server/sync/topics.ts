import axios from "axios";
import { db } from "@/server/db";
import type { APITopic, Topic } from "@/types/topic";
import { topics } from "../db/schema/topics";
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
  data: APITopic[];
};

async function fetchTopics(Page: number, pageLimit = 100) {
  try {
    const response = await axios.get(
      "https://www.abgeordnetenwatch.de/api/v2/topics?page=" +
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
function transformTopics(topic: APITopic): Topic {
  return {
    ...topic,
    parent: (topic.parent ? topic.parent[0] : null)?.id,
  };
}

export async function syncTopics() {
  const { meta } = await fetchTopics(1, 1);
  console.log("Topics:" + meta.result.total);
  for (let i = 0; i < Math.ceil(meta.result.total / 1000); i += 1) {
    const { data } = await fetchTopics(i, 1000);
    for (const topic of data) {
      const transfromatedTopic = transformTopics(topic);
      // console.log(transfromatedTopic);
      await db
        .insert(topics)
        .values(transfromatedTopic)
        .onConflictDoUpdate({
          target: topics.id,
          set: transfromatedTopic,
        })
        .catch(console.error);
    }
  }
}
