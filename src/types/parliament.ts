// Felder
// Name	Beschreibung	Datentyp	Filter
// id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Das Label / die Bezeichnung der Entität.	String	Keine Einschränkung.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// abgeordnetenwatch_url	Die URL zur Detailansicht für diese Entität auf abgeordnetenwatch.de.	String	Nicht filterbar.
// label_external_long	Eine lange Bezeichnung für das Parlament, z.B. "Abgeordnetenhaus von Berlin".	String	Keine Einschränkung.
// current_project	Definiert die aktuelle Parlamentsperiode, also die Parlamentsperiode, die bei uns gerade aktuell auf der Landingpage des jeweiligen Parlaments zu sehen ist. Steht eine Wahl an, wird das die Wahlperiode sein, ansonsten ist das die aktuelle Legislatur.	Referenz -> ParliamentPeriod	Es kann nach der Id der Parlamentsperiode gefiltert werden. Hinweise zur Filterung mit Referenzfeldern
import type { ParliamentPeriod } from "./parliamentPeriod";
export type APIParliament = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  label_external_long: string;
  current_project: ParliamentPeriod;
};

export type Parliament = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  label_external_long: string;
  current_project: number;
};
