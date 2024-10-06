// id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Die Bezeichnung der Fraktion setzt sich zusammen aus der Abkürzung des Fraktionsnamens und der Bezeichnung der Parlamentsperiode	String	Keine Einschränkung.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// full_name	Der ausgeschriebene, volle Name der Fraktion	String	Keine Einschränkung.
// short_name	Die Abkürzung des Fraktionsnamens	String	Keine Einschränkung.
// legislature	Referenz auf die Legislatur, zu der die Fraktion gehört.	Referenz -> ParliamentPeriod	Es kann nach der Id der Parlamentsperiode gefiltert werden. Hinweise zur Filterung mit Referenzfeldern
import { ParliamentPeriod } from "./parliamentPeriod";

export interface Fraction {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  full_name: string;
  short_name: string;
  legislature: ParliamentPeriod;
}
