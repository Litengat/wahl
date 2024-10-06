// id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Die Bezeichnung der Wahlliste setzt sich zusammen aus dem Namen der Wahlliste und der Bezeichnung der Parlamentsperiode	String	Keine Einschränkung.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// name	Die Bezeichnung der Wahlliste	String	Keine Einschränkung.
// parliament_period	Referenz auf die Parlamentsperiode, mit der die Wahlliste verbunden ist.	Referenz -> ParliamentPeriod	Es kann nach der Id der Parlamentsperiode gefiltert werden. Hinweise zur Filterung mit Referenzfeldern

export type ElectoralList = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  name: string;
  parliament_period: string; // id of ParliamentPeriod
};
