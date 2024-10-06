import { createTable } from "@/server/db/schema";
import { relations } from "drizzle-orm";

import { integer, varchar, text } from "drizzle-orm/pg-core";
import { parliamentPeriods } from "./parliamentPeriods";

export const parliaments = createTable("parliament", {
  id: integer("id").primaryKey(),
  entity_type: varchar("entity_type", { length: 256 }),
  label: varchar("label", { length: 256 }),
  api_url: text("api_url"),
  abgeordnetenwatch_url: text("abgeordnetenwatch_url"),
  label_external_long: varchar("label_external_long", { length: 512 }),
  current_project: integer("current_project"),
});

export const parliaments_relations = relations(
  parliaments,
  ({ one, many }) => ({
    parliament_periods: many(parliamentPeriods),
    current_project: one(parliamentPeriods, {
      fields: [parliaments.current_project],
      references: [parliamentPeriods.id],
    }),
  }),
);
