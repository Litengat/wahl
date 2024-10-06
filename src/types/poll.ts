// id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Das Label / die Bezeichnung der Entität.	String	Keine Einschränkung.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// abgeordnetenwatch_url	Die URL zur Detailansicht für diese Entität auf abgeordnetenwatch.de.	String	Nicht filterbar.
// field_committees	Manche Abstimmungen werden werden durch bestimmte Ausschüssse eingebracht. Wenn dies für eine Abstimmung der Fall war, wird der Ausschuss in diesem Feld gepflegt.	Referenz -> Committee	Es kann nach der Id des Committee gefiltert werden. Hinweise zur Filterung mit Referenzfeldern
// field_intro	Ein einleitender Beschreibungstext zu der Abstimmung-	Text, mit HTML	Keine Einschränkung.
// field_legislature	Definiert die Legislaturperiode, in der die Abstimmung stattfand.	Referenz -> ParliamentPeriod	Es kann nach der Id der Parlamentsperiode gefiltert werden. Hinweise zur Filterung mit Referenzfeldern
// field_poll_date	Das Datum der Abstimmung im Format 2024-09-30.	Date	Keine Einschränkung.
// field_accepted	Das Ergebnis der Abstimmung: angenommen oder abgelehnt	Boolean: true oder false	Keine Einschränkung. Als Werte 0 oder 1 auswählen.
// field_related_links	Wenn es interessante weiterführende Links, etwa zu Protokollen, Änderungsanträgen u.ä. gibt, werden diese hier gepflegt	Array von Objekten, je Link ein Objekt mit "uri" und "title"	Nicht für Filterung nutzbar.
// field_topics	Die Themen, zu denen der Ausschuss aktiv ist. Es können pro Committee mehrere Topics vergeben werde.	Referenzen auf TOPICS, Multivalue	Es kann nach der Id des Topics gefiltert werden.
// Logo für Vielfalt, Weltoffenheit und Toleranz von abgeordnetenwatch.de
import type { Committee } from "./committee";
import type { ParliamentPeriod } from "./parliamentPeriod";
import type { Topic } from "./topic";

export type APIPoll = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  field_committees?: Committee[];
  field_intro?: string;
  field_legislature?: ParliamentPeriod;
  field_poll_date: string;
  field_accepted: boolean;
  field_related_links?: { uri: string; title: string }[];
  field_topics?: Topic[];
};

export type Poll = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  //field_committees?: number[];
  field_intro?: string;
  field_legislature?: number;
  field_poll_date: Date;
  field_accepted: boolean;
  //field_related_links?: { uri: string; title: string }[];
};
