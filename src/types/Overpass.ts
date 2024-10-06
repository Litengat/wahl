// lib/types.ts

// Define a type for an Overpass element (you can expand this based on your specific needs)
export type OverpassElement = {
  id: string; // Use string if IDs can be non-numeric
  bounds: {
    minlat: number;
    minlon: number;
    maxlat: number;
    maxlon: number;
  };
  members: Member[];
};

type Member = {
  geometry: { lat: number; lon: number }[]; // Use an array of lat/lon pairs
};

export type OverpassResponse = {
  elements: OverpassElement[]; // The elements returned by the query
};
