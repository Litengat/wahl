// id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Das Label / die Bezeichnung der Entität.	String	Keine Einschränkung.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// abgeordnetenwatch_url	Die URL zur Detailansicht für diese Entität auf abgeordnetenwatch.de.	String	Nicht filterbar.
// description	Eine Beschreibung der Kategorie, bisher eher nicht gepflegt.	String	Keine Einschränkung.
// parent	Kategorien können Hierarchien haben. Wenn dieses Thema einem anderen untergeordnet ist, ist hier das übergeordnete Thema referenziert.	Referenz -> Topic	Es kann nach der Id des Topics gefiltert werden. Hinweise zur Filterung mit Referenzfeldern
export type APITopic = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  description: string;
  parent?: Topic[];
};

export type Topic = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  abgeordnetenwatch_url: string;
  description: string;
  parent?: number;
};
