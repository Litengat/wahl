import { createTable } from "@/server/db/schema";
import { relations } from "drizzle-orm";

import { varchar, text, integer } from "drizzle-orm/pg-core";
import { committee_topics } from "./committeeTopics";
import { poll_topics } from "./pollTopics";

export const topics = createTable("topic", {
  id: integer("id").primaryKey(),
  entity_type: varchar("entity_type", { length: 256 }),
  label: varchar("label", { length: 256 }),
  api_url: text("api_url"),
  abgeordnetenwatch_url: text("abgeordnetenwatch_url"),
  description: text("description"),
  parent: integer("parent"),
});

export const topics_relations = relations(topics, ({ one, many }) => ({
  parent: one(topics, {
    fields: [topics.parent],
    references: [topics.id],
  }),
  committee_topics: many(committee_topics),
  poll_topics: many(poll_topics),
}));
