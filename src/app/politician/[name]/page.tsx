"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Newspaper,
  Mail,
  Twitter,
  VoteIcon,
  Calendar,
  Award,
  FileText,
} from "lucide-react";

import Link from "next/link";
import {
  getPoliticianById,
  getPoliticianByName,
} from "@/server/actions/politicians";
import { useQuery } from "@tanstack/react-query";
import type { Politician } from "@/types/politician";
import { MandatCard } from "./cards/mandat";
import { ProfileCard } from "./cards/Profile";
import { MapCard } from "./cards/Map";
export default function Page({ params }: { params: { name: string } }) {
  const [firstName, lastName] = params.name.split("-");

  const { data, isLoading, isError } = useQuery<Politician>({
    queryKey: ["politician", firstName, lastName],
    queryFn: () => getPoliticianByName(firstName, lastName),
  });
  if (!firstName || !lastName) {
    return <div>Invalid name</div>;
  }
  const politician = data;
  //if (!politician) return <div>Politician not found</div>;
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto flex-grow px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-1">
            <ProfileCard politician={politician} />
            <MandatCard politician={politician} />
            <MapCard politician={politician} />
            {/* <UpcomingEvents />
            <Achievements />
            <LegislativeInitiatives /> */}
          </div>
          <div className="md:col-span-2">
            <div className="space-y-6">
              <AboutCard />
              <Activities />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AboutCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Jane Doe</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Jane Doe has been serving as a Senator for the State of Example since
          2015. With a background in environmental law, she has been a strong
          advocate for climate change policies and sustainable development. Jane
          is known for her bipartisan approach to legislation and her commitment
          to constituent services.
        </p>
      </CardContent>
    </Card>
  );
}

function VotingRecord() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <VoteIcon className="mr-2 h-4 w-4" />
          Voting Record
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Climate Bill</span>
            <Badge>Yea</Badge>
          </li>
          <li className="flex justify-between">
            <span>Education Reform</span>
            <Badge>Yea</Badge>
          </li>
          <li className="flex justify-between">
            <span>Healthcare Act</span>
            <Badge>Nay</Badge>
          </li>
          <li className="flex justify-between">
            <span>Tax Reform</span>
            <Badge>Yea</Badge>
          </li>
        </ul>
        <Button variant="link" className="mt-2 p-0">
          View Full Voting Record
        </Button>
      </CardContent>
    </Card>
  );
}

function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <p className="font-semibold">Town Hall Meeting</p>
            <p className="text-sm text-muted-foreground">
              July 15, 2024 - City Hall
            </p>
          </li>
          <li>
            <p className="font-semibold">Committee Hearing</p>
            <p className="text-sm text-muted-foreground">
              July 22, 2024 - State Capitol
            </p>
          </li>
          <li>
            <p className="font-semibold">Charity Gala</p>
            <p className="text-sm text-muted-foreground">
              August 5, 2024 - Grand Hotel
            </p>
          </li>
        </ul>
        <Button variant="link" className="mt-2 p-0">
          View All Events
        </Button>
      </CardContent>
    </Card>
  );
}

function Achievements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-4 w-4" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <p className="font-semibold">Environmental Leadership Award</p>
            <p className="text-sm text-muted-foreground">
              2023 - State Environmental Council
            </p>
          </li>
          <li>
            <p className="font-semibold">Outstanding Public Service</p>
            <p className="text-sm text-muted-foreground">
              2022 - National Governors Association
            </p>
          </li>
          <li>
            <p className="font-semibold">Education Advocate of the Year</p>
            <p className="text-sm text-muted-foreground">
              2021 - State Teachers Association
            </p>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
function LegislativeInitiatives() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Legislative Initiatives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>
            <p className="font-semibold">Clean Energy Act</p>
            <p className="text-sm text-muted-foreground">
              Promoting renewable energy sources and reducing carbon emissions
            </p>
          </li>
          <li>
            <p className="font-semibold">Education Funding Reform</p>
            <p className="text-sm text-muted-foreground">
              Ensuring equitable funding for schools across the state
            </p>
          </li>
          <li>
            <p className="font-semibold">Small Business Support Program</p>
            <p className="text-sm text-muted-foreground">
              Providing resources and tax incentives for local businesses
            </p>
          </li>
        </ul>
        <Button variant="link" className="mt-2 p-0">
          View All Initiatives
        </Button>
      </CardContent>
    </Card>
  );
}

function Activities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4">
          <Newspaper className="mt-1 h-5 w-5 text-muted-foreground" />
          <div>
            <h3 className="font-semibold">Introduced New Climate Bill</h3>
            <p className="text-sm text-muted-foreground">
              Senator Doe introduced a comprehensive climate bill aimed at
              reducing carbon emissions by 50% by 2030.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Newspaper className="mt-1 h-5 w-5 text-muted-foreground" />
          <div>
            <h3 className="font-semibold">Town Hall Meeting</h3>
            <p className="text-sm text-muted-foreground">
              Held a virtual town hall meeting to discuss the upcoming
              infrastructure project in the state.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <Newspaper className="mt-1 h-5 w-5 text-muted-foreground" />
          <div>
            <h3 className="font-semibold">Committee Hearing on Education</h3>
            <p className="text-sm text-muted-foreground">
              Participated in a Senate committee hearing on the state of public
              education and potential reforms.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
