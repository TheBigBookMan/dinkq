import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyClubs } from "../../features/clubs/hooks";
import ClubCard from "../../features/organiser/components/ClubCard";
import LiveSessionCard from "../../features/organiser/components/LiveSessionCard";
import RecentSessionsCard from "../../features/organiser/components/RecentSessionsCard";
import { useLiveSession, useSessions } from "../../features/sessions/hooks";
import { AddPlayerDialog } from "../../features/players/components/AddPlayerDialog";
import { NoClubCard } from "../../features/organiser/components/NoClubCard";
import { ClubList } from "./ClubList";
import { UpcomingSession } from "../../features/organiser/components/UpcomingSession";

const OrganiserPage = () => {
  const navigate = useNavigate();
  const [addOpen, setAddOpen] = useState<boolean>(false);

  const { data: clubs, isPending: clubsPending, isError: clubsError } = useMyClubs();
  const clubList = clubs ?? [];
  const onCreateClub = () => navigate("/organiser/club/new-club");

  if (clubList.length === 0) return <NoClubCard onCreateClub={onCreateClub} />

  const { data: live } = useLiveSession();
  const { data: recentData } = useSessions({ scope: "recent" });
  const { data: upcomingData } = useSessions({ scope: "upcoming" });

  const recent = recentData?.pages[0].items ?? [];
  // the upcoming scope is sorted soonest-first and also contains postponed sessions
  const upcoming = upcomingData?.pages[0].items.find((s) => s.status === "SCHEDULED") ?? null;

  return (
    <div className="space-y-2 px-4 py-2">
      <div className="grid gap-4 lg:grid-cols-3">
        {live && <LiveSessionCard session={live} className="lg:col-span-2" />}

        <UpcomingSession
          session={upcoming}
          onStart={(id) => console.log("start", id)}
          className={live ? "" : "lg:col-span-2"}
        />

        {clubsPending ? null : clubsError ? (
          <section className="neon-card p-5 text-sm sm:p-6">Couldn't load your clubs.</section>
        ) : clubList.length === 1 ? (
          <ClubCard
            clubId={clubList[0].clubId}
            name={clubList[0].clubName}
            playerCount={clubList[0].playerCount}
            newThisMonth={clubList[0].newThisMonth}
            guestsToReview={clubList[0].guestsToReview}
            lastSessionAt={clubList[0].lastSessionAt}
            onAddPlayer={() => setAddOpen(true)}
          />
        ) : (
          <ClubList clubs={clubList} onCreateClub={onCreateClub} />
        )}

        <RecentSessionsCard recentSessions={recent} showClub={clubList.length > 1} />
      </div>

      <AddPlayerDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onSubmit={async (player) => {
          await new Promise((r) => setTimeout(r, 600)); // DUMMY: later, call your useAddPlayer mutation
          console.log(player);
        }}
      />
    </div>
  );
};

export default OrganiserPage;