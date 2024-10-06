// id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Die Bezeichnung setzt sich bei Vote Entitäten aus dem Namen des/der Politker:in und dem Titel der Abstimmung zusammen.	String	Nicht filterbar.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// mandate	Referenz auf das Mandat und damit auf den Mandatsträger/ die Mandatsträgerin, der / die an der Abstimmung teilgenommen hat.	Referenz -> CandidacyMandate	Es kann nach der Id des Mandats gefiltert werden. Hinweise zur Filterung mit Referenzfeldern
// fraction	Eine Information, die sonst etwas kompliziert aus der API geholt werden müsste. Um die API zu vereinfachen, bauen wir diese Referenz direkt hier ein.	Referenz -> Fraction	Es kann nach der Id der Fraktion gefiltert werden. Eine weitere Verketttung / Filterung nach Feldern in der Fraction Entität ist nicht möglich. Funktioniert nur in Kombination mit poll als Parameter und auch der IN und NOT IN Operator funktionieren für diesen Filter nicht.
// poll	Referenz auf die Abstimmung.	Referenz -> Poll	Es kann nach der Id der Abstimmung gefiltert werden. Die Id kann mit dem OpenData-Button, der auf jeder Detailseite einer Abstimmung zu finden ist, herausgefunden werden. Die Verwendung der Operatoren IN und NOT IN ist nicht möglich.Hinweise zur Filterung mit Referenzfeldern
// vote	Konkretes Abstimmverhalten. Mögliche Werte sind: yes (Dafür gestimmt), no (Dagegen gestimmt), abstain (Enthalten), no_show (Nicht beteiligt)	String	Keine Einschränkung.
// reason_no_show	Wenn jemand an einer Abstimmung nicht teilgenommen hat, gibt es ein paar auswählbare Begründungen: maternity_protection (Mutterschutz/ Elternzeit), fell_ill (krank), other (Andere)	String	Keine Einschränkung.

import type { CandidacyMandate } from "./candidaciesMandates";
import type { Poll } from "./poll";

// reason_no_show_other	Ermöglicht eine textliche Beschreibung, wenn als Grund "other" ausgewählt wurde.	String	Keine Einschränkung.
export type APIVote = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  mandate: CandidacyMandate; // Assuming mandate is a string representing the reference ID
  fraction: number; // Assuming fraction is a string representing the reference ID
  poll: Poll; // Assuming poll is a string representing the reference ID
  vote: "yes" | "no" | "abstain" | "no_show";
  reason_no_show?: "maternity_protection" | "fell_ill" | "other";
  reason_no_show_other?: string;
};

export type Vote = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  mandate: number; // Assuming mandate is a string representing the reference ID
  //fraction: number; // Assuming fraction is a string representing the reference ID
  poll: number; // Assuming poll is a string representing the reference ID
  vote: "yes" | "no" | "abstain" | "no_show";
  reason_no_show?: "maternity_protection" | "fell_ill" | "other";
  reason_no_show_other?: string;
};
