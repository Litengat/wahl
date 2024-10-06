import { integer, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { committee_topics } from "./committeeTopics";
import { createTable } from "../schema";
import { poll_topics } from "./pollTopics";

export const polls = createTable("polls", {
  id: integer("id").primaryKey(),
  entity_type: text("entity_type"),
  label: text("label").notNull(),
  api_url: text("api_url").notNull(),
  abgeordnetenwatch_url: text("abgeordnetenwatch_url"),
  //field_committees: integer("field_committees"),
  field_intro: text("field_intro"),
  field_legislature: integer("field_legislature"),
  field_poll_date: timestamp("field_poll_date"),
  field_accepted: boolean("field_accepted"),
  //   field_related_links: array(
  //     object({
  //       uri: text("uri"),
  //       title: text("title"),
  //     }),
  //   )
});

export const poll_relations = relations(polls, ({ many }) => ({
  pool_topics: many(poll_topics),
}));
