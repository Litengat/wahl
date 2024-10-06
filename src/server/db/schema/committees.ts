import { createTable } from "@/server/db/schema";

import { varchar, text, integer } from "drizzle-orm/pg-core";
import { parliamentPeriods } from "./parliamentPeriods";
import { relations } from "drizzle-orm";
import { committee_topics } from "./committeeTopics";

export const committees = createTable("committee", {
  id: integer("id").primaryKey(),
  entity_type: varchar("entity_type", { length: 256 }),
  label: varchar("label", { length: 256 }),
  api_url: text("api_url"),
  abgeordnetenwatch_url: text("abgeordnetenwatch_url"),
  field_legislature: integer("field_legislature").references(
    () => parliamentPeriods.id,
  ),
});

export const committees_relations = relations(committees, ({ many }) => ({
  committee_topics: many(committee_topics),
}));
