// id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Das Label / die Bezeichnung der Entität.	String	Keine Einschränkung.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// abgeordnetenwatch_url	Die URL zur Detailansicht für diese Entität auf abgeordnetenwatch.de.	String	Nicht filterbar.
// field_legislature	Definiert die Legislaturperiode, zu der dieser Ausschuss gehört.	Referenz -> ParliamentPeriod	Es kann nach der Id der Parlamentsperiode gefiltert werden. Hinweise zur Filterung mit Referenzfeldern

import type { ParliamentPeriod } from "./parliamentPeriod";
import type { Topic } from "./topic";

// field_topics	Die Themen, zu denen der Ausschuss aktiv ist. Es können pro Committee mehrere Topics vergeben werde.	Referenzen -> Topic, Multivalue	Es kann nach der Id des Topics gefiltert werden.
export type APICommittee = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  field_legislature: ParliamentPeriod;
  field_topics: Topic[];
};

export type Committee = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  field_legislature: number;
};
