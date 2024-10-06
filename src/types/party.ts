// id	Die eindeutige Id der Entität	Integer	Keine Einschränkung.
// entity_type	Die eindeutige Id des Entitätstyps.	String	Nicht filterbar.
// label	Die kurze Form des Parteien-Namens.	String	Keine Einschränkung.
// api_url	Der API-Pfad, unter dem die einzelne Entität aufgerufen werden kann.	String	Nicht filterbar.
// full_name	Der ausgeschriebene Name einer Partei (zur Zeit nicht gepflegt).	String	Keine Einschränkung.
// short_name	Die Abkürzung des Namens.	String	Keine Einschränkung.
export type Party = {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  full_name?: string;
  short_name?: string;
};
