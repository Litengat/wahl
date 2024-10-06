import { integer, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { parliamentPeriods } from "./parliamentPeriods";
import { createTable } from "../schema";

export const constituency = createTable("constituency", {
  id: integer("id").primaryKey(),
  entity_type: text("entity_type"),
  label: text("label"),
  api_url: text("api_url"),
  name: text("name"),
  number: integer("number"),
  parliament_period: integer("parliament_period"),
});

export const constituencyRelations = relations(constituency, ({ one }) => ({
  parliamentPeriod: one(parliamentPeriods, {
    fields: [constituency.parliament_period],
    references: [parliamentPeriods.id],
  }),
}));
