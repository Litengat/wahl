import { createTable } from "@/server/db/schema";
import { relations } from "drizzle-orm";
import { varchar, text, timestamp, integer } from "drizzle-orm/pg-core";
import { parliaments } from "./parliaments";

export const parliamentPeriods = createTable("parliament_period", {
  id: integer("id").primaryKey(),
  entity_type: varchar("entity_type", { length: 256 }),
  label: varchar("label", { length: 256 }),
  api_url: text("api_url"),
  abgeordnetenwatch_url: text("abgeordnetenwatch_url"),
  parliament: integer("parliament_id").references(() => parliaments.id),
  previous_period: integer("previous_period_id"),
  type: varchar("type", { length: 256 }),
  election_date: timestamp("election_date"),
  start_date_period: timestamp("start_date_period"),
  end_date_period: timestamp("end_date_period"),
});

export const parliamentPeriodsRelations = relations(
  parliamentPeriods,
  ({ one }) => ({
    parliament: one(parliaments, {
      fields: [parliamentPeriods.parliament],
      references: [parliaments.id],
    }),
    previousPeriod: one(parliamentPeriods, {
      fields: [parliamentPeriods.previous_period],
      references: [parliamentPeriods.id],
    }),
  }),
);
