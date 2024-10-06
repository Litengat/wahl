import { createTable } from "@/server/db/schema";
import { relations } from "drizzle-orm";

import { integer, text } from "drizzle-orm/pg-core";
import { committees } from "./committees";
import { topics } from "./topics";

export const committee_topics = createTable("committee_topic", {
  id: text("id").primaryKey(),
  committee_id: integer("committee_id").references(() => committees.id),
  topic_id: integer("topic_id").references(() => topics.id),
});

export const committee_topics_relations = relations(
  committee_topics,
  ({ one }) => ({
    committee: one(committees, {
      fields: [committee_topics.committee_id],
      references: [committees.id],
    }),
    topic: one(topics, {
      fields: [committee_topics.topic_id],
      references: [topics.id],
    }),
  }),
);
