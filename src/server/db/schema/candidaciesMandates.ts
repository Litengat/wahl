import { createTable } from "@/server/db/schema";
import { timestamp, varchar, text, integer, json } from "drizzle-orm/pg-core";
import { parliamentPeriods } from "./parliamentPeriods";
import { politicians } from "./politicians";
import { relations } from "drizzle-orm";
import type {
  electoral_data,
  fraction_membership,
} from "@/types/candidaciesMandates";

export const candidacies_mandates = createTable("candidacy_mandate", {
  id: integer("id").primaryKey(),
  entity_type: varchar("entity_type", { length: 256 }),
  label: varchar("label", { length: 512 }),
  api_url: text("api_url"),
  id_external_administration: varchar("id_external_administration", {
    length: 256,
  }),
  id_external_administration_description: varchar(
    "id_external_administration_description",
    { length: 512 },
  ),
  type: varchar("type", { length: 256 }),
  parliament_period: integer("parliament_period_id").references(
    () => parliamentPeriods.id,
  ),
  politician: integer("politician").references(() => politicians.id),
  start_date: timestamp("start_date"),
  end_date: timestamp("end_date"),
  info: text("info"),
  electoral_data: json("electoral_data").$type<electoral_data>(),
  fraction_membership: json("fraction_membership").$type<
    fraction_membership[]
  >(),
});

export const candidacies_mandates_relations = relations(
  candidacies_mandates,
  ({ one }) => ({
    parliament_period: one(parliamentPeriods, {
      fields: [candidacies_mandates.parliament_period],
      references: [parliamentPeriods.id],
    }),
    politician: one(politicians, {
      fields: [candidacies_mandates.politician],
      references: [politicians.id],
    }),
  }),
);
