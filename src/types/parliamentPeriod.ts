// Felder
// Name	Beschreibung	Datentyp	Filter
// id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Das Label / die Bezeichnung der Entität.	String	Keine Einschränkung.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// abgeordnetenwatch_url	Die URL zur Detailansicht für diese Entität auf abgeordnetenwatch.de.	String	Nicht filterbar.
// parliament	Definiert das Parlament, zu dem diese Parlamentsperiode gehört.	Referenz auf -> Parliament	Es kann nach der Id des Parlaments gefiltert werden. Hinweise zur Filterung mit Referenzfeldern
// previous_period	Die Parlamentsperiode, auf welche die Parlamentsperiode folgt. Im Moment wurde das Feld nur für Legislaturen gepflegt, um die vorherige Wahlperiode zu definieren.	Referenz -> ParliamentPeriod	Es kann nach der Id der Parlamentsperiode gefiltert werden. Hinweise zur Filterung mit Referenzfeldern
// type	Der Typ der Parlamentsperiode. Kann den Wert "election" oder "legislature" haben.	String	Keine Einschränkung.
// election_date	Das Datum der Wahl im Format 2024-09-30, ist nur bei Parlamentsperioden vom Typ "election" / Wahl gepflegt, bei einer Legislatur ist der Wert NULL	Date	Keine Einschränkung.
// start_date_period	Das Startdatum der Parlamentsperiode im Format 2024-09-30. Bei einer Legislatur entspricht das dem Startdatum der Legislatur, bei einer Wahl entspricht das in etwa dem Beginn des Wahlkampfs.	Date	Keine Einschränkung.
// end_date_period	Das Enddatum der Parlamentsperiode im Format 2024-09-30. Bei einer Legislatur entspricht das dem Enddatum der Legislatur, bei einer Wahl entspricht das dem Ende des Wahlkampfs oder des Wahltermins.	Date	Keine Einschränkung.
// Logo für Vielfalt, Weltoffenheit und Toleranz von abgeordnetenwatch.de
import type { Parliament } from "./parliament";
export type APIParliamentPeriod = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  parliament: Parliament;
  previous_period?: APIParliamentPeriod;
  type: "election" | "legislature";
  election_date?: string;
  start_date_period: string;
  end_date_period: string;
};
export type ParliamentPeriod = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  parliament: number;
  previous_period?: number;
  type: "election" | "legislature";
  election_date?: Date;
  start_date_period: Date;
  end_date_period: Date;
};
