import type { Politician } from "./politician";
import type { ParliamentPeriod } from "./parliamentPeriod";
import type { ElectoralList } from "./electoralList";
import type { Constituency } from "./constituency";

export type APICandidacyMandate = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  id_external_administration?: string;
  id_external_administration_description?: string;
  type: "candidacy" | "mandate";
  parliament_period: ParliamentPeriod;
  politician: Politician;
  start_date?: string; // Date in format YYYY-MM-DD
  end_date?: string; // Date in format YYYY-MM-DD
  info?: string;
  electoral_data?: {
    electoral_list?: ElectoralList;
    list_position?: number;
    constituency?: Constituency;
    constituency_result?: number; // Float
    constituency_result_count?: number;
    mandate_won?: "constituency" | "list" | "moved_up";
  };
  fraction_membership?: fraction_membership[];
};

export type CandidacyMandate = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  id_external_administration?: string;
  id_external_administration_description?: string;
  type: "candidacy" | "mandate";
  parliament_period: number;
  politician: number;
  start_date?: Date; // Date in format YYYY-MM-DD
  end_date?: Date; // Date in format YYYY-MM-DD
  info?: string;
  electoral_data?: electoral_data;
  fraction_membership?: fraction_membership[];
};

export type electoral_data = {
  electoral_list?: number;
  list_position?: number;
  constituency?: number;
  constituency_result?: number; // Float
  constituency_result_count?: number;
  mandate_won?: "constituency" | "list" | "moved_up";
};

export type fraction_membership = {
  label: string;
  fraction: number;
  valid_from?: string; // Date in format YYYY-MM-DD
  valid_until?: string; // Date in format YYYY-MM-DD
};
