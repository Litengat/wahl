import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Politician } from "@/types/politician";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Twitter } from "lucide-react";

export function ProfileCard({ politician }: { politician?: Politician }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center pt-6">
        {politician ? (
          <Avatar className="h-48 w-48">
            <AvatarImage
              src="/placeholder.svg?height=192&width=192"
              alt={politician.label}
            />
            <AvatarFallback>
              {politician?.first_name.slice(0, 1) +
                politician.last_name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Skeleton className="h-48 w-48 rounded-full" />
        )}
        {politician ? (
          <h1 className="mt-4 text-2xl font-bold">
            {(politician.field_title ?? "") + " " + politician.label}
          </h1>
        ) : (
          <Skeleton className="mt-4 h-8 w-52" />
        )}
        {politician ? (
          <p className="text-muted-foreground">{politician.occupation}</p>
        ) : (
          <Skeleton className="mt-2 h-4 w-52" />
        )}
        <div className="mt-4 flex space-x-4">
          <Button size="icon" variant="outline">
            <Mail className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <Twitter className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
