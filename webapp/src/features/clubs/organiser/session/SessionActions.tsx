import { Link } from "react-router-dom";
import { CalendarClockIcon, CalendarPlusIcon, PencilIcon, PlayIcon, SquareIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import type { SessionDetail } from "../../../sessions/types";

type Props = {
  session: SessionDetail;
  onStart: () => void;
  onEnd: () => void;
  onEdit: () => void;
  onPostpone: () => void;
  onCancel: () => void;
};

const primary =
  "h-10 rounded-lg bg-linear-to-r from-neon-violet to-neon-magenta px-4 font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon";

export function SessionActions({ session, onStart, onEnd, onEdit, onPostpone, onCancel }: Props) {
  const { status } = session;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "SCHEDULED" && (
        <>
          <Button onClick={onStart} className={primary}>
            <PlayIcon />
            Start session
          </Button>
          <Button variant="outline" onClick={onEdit} className="h-10">
            <PencilIcon />
            Edit
          </Button>
          <Button variant="outline" onClick={onPostpone} className="h-10">
            <CalendarClockIcon />
            Postpone
          </Button>
          <Button variant="ghost" onClick={onCancel} className="h-10 text-destructive hover:text-destructive">
            Cancel session
          </Button>
        </>
      )}

      {status === "LIVE" && (
        <Button variant="outline" onClick={onEnd} className="h-10 border-destructive/50 text-destructive hover:text-destructive">
          <SquareIcon />
          End session
        </Button>
      )}

      {status === "POSTPONED" && (
        <>
          <Button onClick={onEdit} className={primary}>
            <CalendarClockIcon />
            Reschedule
          </Button>
          <Button variant="ghost" onClick={onCancel} className="h-10 text-destructive hover:text-destructive">
            Cancel session
          </Button>
        </>
      )}

      {(status === "COMPLETED" || status === "CANCELED") && (
        <Button asChild className={primary}>
          <Link to={`/organiser/sessions/new?club=${session.clubId}`}>
            <CalendarPlusIcon />
            Schedule another
          </Link>
        </Button>
      )}
    </div>
  );
}