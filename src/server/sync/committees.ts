import axios from "axios";
import { db } from "@/server/db";

import { committees } from "@/server/db/schema/committees";
import type { APICommittee, Committee } from "@/types/committee";
import { committee_topics } from "../db/schema/committeeTopics";

type fetchCommitteeSchema = {
  meta: {
    result: {
      count: number;
      total: number;
      range_start: number;
      range_end: number;
    };
  };
  data: APICommittee[];
};

async function fetchCommittees(Page: number, pageLimit = 100) {
  try {
    const response = await axios.get(
      "https://www.abgeordnetenwatch.de/api/v2/committees?page=" +
        Page +
        "&pager_limit=" +
        pageLimit,
    );
    const data: fetchCommitteeSchema = response.data as fetchCommitteeSchema;
    return data;
  } catch (error) {
    console.log("fetcherror");
    throw error;
  }
}

function transformCommittee(committee: APICommittee): Committee {
  // Example transformation: add a new field or modify an existing one
  return {
    ...committee,
    field_legislature: committee.field_legislature?.id,
  };
}

function createCommitteeTopicRelation(committee: APICommittee) {
  if (!committee?.field_topics) return;
  for (const topic of committee?.field_topics) {
    db.insert(committee_topics)
      .values({
        id: `${committee.id}-${topic.id}`,
        committee_id: committee.id,
        topic_id: topic.id,
      })
      .onConflictDoNothing()
      .catch(console.error);
  }
}

// Function to sync committees
export async function syncCommittees() {
  const { meta } = await fetchCommittees(1, 1);
  console.log("Committees: ", meta.result.total);
  for (let i = 0; i < Math.ceil(meta.result.total / 1000); i += 1) {
    const { data } = await fetchCommittees(i, 1000);
    for (const committee of data) {
      const transformedCommittee = transformCommittee(committee);
      await db
        .insert(committees)
        .values(transformedCommittee)
        .onConflictDoUpdate({
          target: committees.id,
          set: transformedCommittee,
        })
        .catch(console.error);
      createCommitteeTopicRelation(committee);
    }
  }
}
