import { integer, text } from "drizzle-orm/pg-core";

import { createTable } from "../schema";
import { politicians } from "./politicians";
import { relations } from "drizzle-orm";

export const parties = createTable("party", {
  id: integer("id").primaryKey(),
  entity_type: text("entity_type").notNull(),
  label: text("label").notNull(),
  api_url: text("api_url").notNull(),
  full_name: text("full_name"),
  short_name: text("short_name"),
  color: text("color"),
  qid_wikidata: text("qid_wikidata"),
});

export const committees_relations = relations(parties, ({ many }) => ({
  politicians: many(politicians),
}));
