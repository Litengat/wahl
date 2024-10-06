// id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Die Bezeichnung des Wahlkreises setzt sich zusammen aus der Nummer und dem Namen der Wahlliste sowie der Bezeichnung der Parlamentsperiode	String	Keine Einschränkung.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// name	Die Bezeichnung des Wahlkreisess	String	Keine Einschränkung.
// number	Die Nummer das Wahlkreises	Integer	Keine Einschränkung.

import type { ParliamentPeriod } from "./parliamentPeriod";

// parliament_period	Referenz auf die Parlamentsperiode, mit der die Wahlliste verbunden ist.	Referenz -> ParliamentPeriod	Es kann nach der Id der Parlamentsperiode gefiltert werden. Hinweise zur Filterung mit Referenzfeldern
export type APIConstituency = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  name: string;
  number: number;
  parliament_period: ParliamentPeriod;
};

export type Constituency = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  name: string;
  number: number;
  parliament_period: number;
};
