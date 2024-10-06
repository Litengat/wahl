// lib/overpass.ts
"use server";
import type { OverpassElement } from "@/types/Overpass"; // Adjust the import based on your folder structure

export async function fetchOverpassData(
  query: string,
): Promise<{ elements: OverpassElement[] }> {
  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: "data=" + encodeURIComponent(query),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch Overpass data: ${response.statusText}`);
  }

  return response.json() as Promise<{ elements: OverpassElement[] }>;
}

const query = `
[out:json][timeout:25];
area(id:3600051477)->.searchArea;

relation["type"="boundary"]["election:parliament"="Deutscher Bundestag"]["election:part"="Wahlkreis"]["election:year"="2013"]["ref"="4"];
out geom;

`;
