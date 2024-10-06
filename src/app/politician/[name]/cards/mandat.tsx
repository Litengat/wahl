"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Politician } from "@/types/politician";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "lucide-react";
import { getMandatesofPolitician } from "@/server/actions/mandat";
import { ScrollArea } from "@/components/ui/scroll-area";

export function MandatCard({ politician }: { politician?: Politician }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mandat", politician?.id],
    queryFn: () =>
      politician?.id
        ? getMandatesofPolitician(politician.id)
        : Promise.reject(new Error("No politician ID")),
  });
  const mandates = data;
  if (!politician) return null;
  return (
    <Card className="max-h-44">
      <CardHeader>
        <CardTitle className="flex items-center">
          {/* <VoteIcon className="mr-2 h-4 w-4" /> */}
          Voting Record
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <ul className="space-y-2">
            {mandates?.map((mandat) => (
              <li className="flex justify-between" key={mandat.id}>
                <span>{mandat.label}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>

        {/* <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Climate Bill</span>
            <Badge>Yea</Badge>
          </li>
        </ul> */}
        <Button variant="link" className="mt-2 p-0">
          View Full Voting Record
        </Button>
      </CardContent>
    </Card>
  );
}
