import { createTable } from "@/server/db/schema";
import { relations } from "drizzle-orm";

import { integer, text } from "drizzle-orm/pg-core";
import { polls } from "./polls";
import { topics } from "./topics";

export const poll_topics = createTable("poll_topic", {
  id: text("id").primaryKey(),
  poll_id: integer("poll_id").references(() => polls.id),
  topic_id: integer("topic_id").references(() => topics.id),
});

export const poll_topics_relations = relations(poll_topics, ({ one }) => ({
  poll: one(polls, {
    fields: [poll_topics.poll_id],
    references: [polls.id],
  }),
  topic: one(topics, {
    fields: [poll_topics.topic_id],
    references: [topics.id],
  }),
}));
