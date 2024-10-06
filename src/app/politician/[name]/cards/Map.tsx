import dynamic from "next/dynamic";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Politician } from "@/types/politician";
import { useQuery } from "@tanstack/react-query";
import { getMandatesofPolitician } from "@/server/actions/mandat";
import { getConstituencyById } from "@/server/actions/constituency";
export function MapComponent({
  width,
  height,
  zoom,
  Wahlkreis,
}: {
  width: string;
  height: string;
  zoom: number;
  Wahlkreis: number;
}) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );
  const query = `
[out:json][timeout:25];
area(id:3600051477)->.searchArea;

relation["type"="boundary"]["election:parliament"="Deutscher Bundestag"]["election:part"="Wahlkreis"]["election:year"="2013"]["ref"="${Wahlkreis}"];
out geom;
`;

  return (
    <div>
      <Map width={width} height={height} zoom={zoom} query={query}></Map>
    </div>
  );
}

export function MapCard({ politician }: { politician?: Politician }) {
  const Mandate = useQuery({
    queryKey: ["Wahlkreis", politician?.id],
    queryFn: () => getMandatesofPolitician(politician?.id),
    enabled: !!politician?.id,
  });

  const constituency = useQuery({
    queryKey: ["constituency", politician?.id],
    queryFn: () => {
      const constituencyId = Mandate.data?.[0]?.electoral_data?.constituency;
      if (constituencyId !== undefined) {
        return getConstituencyById(constituencyId);
      } else {
        return Promise.reject(new Error("Constituency ID is undefined"));
      }
    },
    enabled: !!Mandate.data?.[0]?.electoral_data?.constituency,
  });
  if (!politician) return <p>politician is loading</p>;
  return (
    <Card>
      <CardHeader>
        <CardTitle>WahlKreis</CardTitle>
        <CardDescription>{constituency.data?.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          {Mandate.isLoading || constituency.isLoading ? (
            <p>Loading...</p>
          ) : Mandate.isError || constituency.isError ? (
            <p>Error loading data</p>
          ) : constituency.data?.number ? (
            <MapComponent
              width="100%"
              height="384px"
              zoom={9}
              Wahlkreis={constituency.data?.number}
            />
          ) : (
            <p>No constituency data found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
