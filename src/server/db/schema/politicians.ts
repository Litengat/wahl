import { createTable } from "@/server/db/schema";
import { relations } from "drizzle-orm";

import { varchar, text, integer } from "drizzle-orm/pg-core";
import { parliaments } from "./parliaments";
import { parties } from "./party";

export const politicians = createTable("politician", {
  id: integer("id").primaryKey(),
  entity_type: text("entity_type"),
  label: text("label"),
  api_url: text("api_url"),
  abgeordnetenwatch_url: text("abgeordnetenwatch_url"),
  first_name: text("first_name"),
  last_name: text("last_name"),
  birth_name: text("birth_name"),
  sex: varchar("sex", { length: 1 }),
  year_of_birth: integer("year_of_birth"),
  party: integer("party"),
  party_past: text("party_past"),
  education: text("education"),
  residence: text("residence"),
  occupation: text("occupation"),
  statistic_questions: integer("statistic_questions"),
  statistic_questions_answered: integer("statistic_questions_answered"),
  qid_wikidata: text("qid_wikidata"),
  ext_id_bundestagsverwaltung: text("ext_id_bundestagsverwaltung"),
  field_title: text("field_title"),
  profile_picture_url: text("profile_picture_url"),
});

export const politicians_relations = relations(politicians, ({ one }) => ({
  parliament: one(parliaments, {
    fields: [politicians.entity_type],
    references: [parliaments.entity_type],
  }),
  party: one(parties, {
    fields: [politicians.party],
    references: [parties.id],
  }),
}));
