"use client";
import * as React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getVotesOfPolitician } from "@/server/actions/politicians";
import { useQuery } from "@tanstack/react-query";
import { Vote } from "@/types/vote";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPollById } from "@/server/actions/poll";
import { Poll } from "@/types/poll";
import { cn } from "@/lib/utils";
import { Check, X, Minus, UserX } from "lucide-react";
import Image from "next/image";
export interface Artwork {
  artist: string;
  art: string;
}
export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

export default function Votes({ politicianID }: { politicianID: number }) {
  const { data, isLoading, isError } = useQuery<Vote[]>({
    queryKey: ["votes", politicianID],
    queryFn: () => getVotesOfPolitician(politicianID),
  });
  if (!data) return null;
  return (
    <>
      <ScrollArea className="whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {data.map((vote) => (
            <VoteDisplay key={vote.id} vote={vote} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

export function VoteDisplay({ vote }: { vote: Vote }) {
  const { data, isLoading, isError } = useQuery<Poll>({
    queryKey: ["poll", vote.poll],
    queryFn: () => getPollById(vote.poll),
  });
  return (
    <div className="h-72 w-48">
      <Card className="h-72 w-48">
        <CardHeader className="z-2">
          <CardTitle className="text- text-pretty break-words">
            {data?.label}
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <div
        className={cn(
          "relative bottom-20 m-auto flex h-10 w-10 items-center justify-center rounded-full border border-white bg-opacity-50 bg-center",
          {
            "bg-red-500": vote.vote === "no",
            "bg-green-500": vote.vote === "yes",
            "bg-gray-300": vote.vote === "abstain",
          },
        )}
      >
        {vote.vote === "yes" && <Check />}
        {vote.vote === "no" && <X />}
        {vote.vote === "abstain" && <Minus />}
        {vote.vote === "no_show" && <UserX />}
      </div>
    </div>
  );
}
