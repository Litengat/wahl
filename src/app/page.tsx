/* eslint-disable @typescript-eslint/no-unused-vars */
import { syncCandidaciesMandates } from "@/server/sync/candidaciesMandates";
import { syncCommittees } from "@/server/sync/committees";
import { syncConstituency } from "@/server/sync/constituency";
import { syncParliaments } from "@/server/sync/parliament";
import { syncParliamentPeriods } from "@/server/sync/parliamentPeriods";
import { syncParties } from "@/server/sync/party";
import { fetchWikidata, syncPoliticians } from "@/server/sync/politicians";
import { syncTopics } from "@/server/sync/topics";
import { syncPolls } from "@/server/sync/poll";
import { syncVotes } from "@/server/sync/votes";
import { MapComponent } from "./politician/[name]/cards/Map";
export default async function HomePage() {
  //await syncTopics().catch(console.error);
  //await syncParties().catch(console.error);
  //await syncParliaments().catch(console.error);
  //await syncParliamentPeriods().catch(console.error);
  //await syncPoliticians().catch(console.error);
  //await syncCandidaciesMandates().catch(console.error);
  //await syncCommittees().catch(console.error);
  //await syncConstituency().catch(console.error);
  //await syncPolls().catch(console.error);
  //await syncVotes().catch(console.error);
  return <div></div>;
}
