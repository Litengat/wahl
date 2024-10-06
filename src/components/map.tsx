// // components/LeafletMap.tsx
"use client";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchOverpassData } from "@/lib/overpass"; // Import reusable function
import { useQuery } from "@tanstack/react-query";

export default function MyMap({
  query,
  height,
  width,
  zoom,
}: {
  query: string;
  height: string;
  width: string;
  zoom: number;
}) {
  const { data } = useQuery({
    queryKey: ["overpass", query],
    queryFn: () => fetchOverpassData(query),
  });
  const mapData = data?.elements;
  console.log(mapData);
  if (!mapData) return null;
  const [lat, lon] = calcCenter(mapData[0]?.bounds);

  return (
    <div className="">
      <MapContainer
        center={[lat, lon]}
        zoom={zoom}
        style={{ height: height, width: width }}
      >
        <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" />
        {mapData.map((element, idx) =>
          element.members.map((geo, geoIdx) => (
            <Polyline
              fill={true}
              key={idx + "-" + geoIdx}
              positions={formatecords(geo.geometry)}
            />
          )),
        )}
      </MapContainer>
    </div>
  );
}

function formatecords(geo: { lat: number; lon: number }[]): [number, number][] {
  return geo.map((cord) => [cord.lat, cord.lon] as [number, number]);
}

function calcCenter(
  bounds:
    | {
        minlat: number;
        minlon: number;
        maxlat: number;
        maxlon: number;
      }
    | undefined,
): [number, number] {
  if (!bounds) return [0, 0];
  return [
    (bounds.minlat + bounds.maxlat) / 2,
    (bounds.minlon + bounds.maxlon) / 2,
  ];
}
