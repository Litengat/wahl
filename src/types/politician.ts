//  id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Das Label ist hier der volle Name, also Vor- und Nachname.	String	Keine Einschränkung.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// abgeordnetenwatch_url	Die URL zur Detailansicht für diese Entität auf abgeordnetenwatch.de.	String	Nicht filterbar.
// first_name	Der Vorname der Person.	String	Keine Einschränkung.
// last_name	Der Nachname der Person.	String	Keine Einschränkung.
// birth_name	Der Geburtsname der Person, kann NULL sein.	String	Keine Einschränkung.
// sex	Die Geschlechtsangabe. Mögliche Werte sind "m" (= male / männlich), "f" (= female / weiblich) und "d" (= divers). Auch keine Angabe (NULL) ist möglich.	String	Keine Einschränkung.
// year_of_birth	Das Geburtsjahr.	Integer	Keine Einschränkung.
// party	Die Partei, der der Politiker oder die Politikerin aktuell angehört.	Referenz -> Party	Es kann nach der Id der Party gefiltert werden. Hinweise zur Filterung mit Referenzfeldern
// party_past	Ein Freitextfeld, in das wir Informationen zu vorherigen Parteizugehörigkeiten und andere Hinweise vermerken.	String	Keine Einschränkung.
// education	Angaben zur Qualifikation.	String	Keine Einschränkung.
// residence	Der Wohnort der Person.	String	Keine Einschränkung.
// occupation	Aktueller Beruf.	String	Keine Einschränkung.
// statistic_questions	Anzahl der Fragen. Gezählt werden nur die Fragen, die im Kontext einer aktuellen Kandidatur oder eines aktuellen Mandates gestellt wurden. Bei Politiker:innen ohne aktuelle Mandate oder Kandidaturen ist der Wert 0 oder NULL.	String im JSON, aber immer eine Zahl oder NULL.	Keine Einschränkung.
// statistic_questions_answered	Anzahl der beantworteten Fragen. Gezählt werden nur die Fragen, die im Kontext einer aktuellen Kandidatur oder eines aktuellen Mandates gestellt wurden. Bei Politiker:innen ohne aktuelle Mandate oder Kandidaturen ist der Wert 0 oder NULL.	String im JSON, aber immer eine Zahl oder NULL.	Keine Einschränkung.
// qid_wikidata	QID für einen Datensatz bei Wikidata, der weitere Informationen zu dem Politiker / zu der Politikerin beinhalten kann.	String	Keine Einschränkung.
// ext_id_bundestagsverwaltung	Id des Politikers bei der Verwaltung des Deutschen Bundestags.	String	Keine Einschränkung.
// field_title	Der akademische Titel des Politiker / der Politikerin. Wird von uns nicht gepflegt, sondern nur von den Politiker:innen selbst.	String	Keine Einschränkung.

import type { Party } from "./party";

export type Politician = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  first_name: string;
  last_name: string;
  birth_name?: string | null;
  sex?: "m" | "f" | "d" | null;
  year_of_birth: number;
  party: number;
  party_past: string;
  education: string;
  residence: string;
  occupation: string;
  statistic_questions: number | null;
  statistic_questions_answered: number | null;
  qid_wikidata: string;
  ext_id_bundestagsverwaltung: string;
  field_title: string;
};

export type APIPolitician = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  first_name: string;
  last_name: string;
  birth_name?: string | null;
  sex?: "m" | "f" | "d" | null;
  year_of_birth: number;
  party: Party;
  party_past: string;
  education: string;
  residence: string;
  occupation: string;
  statistic_questions: number | null;
  statistic_questions_answered: number | null;
  qid_wikidata: string;
  ext_id_bundestagsverwaltung: string;
  field_title: string;
};
