import { Button } from "../ui/button";

interface PageErrorInterface {
  error: string;
  description?: string;
  isDisabled: boolean;
  refetch: () => unknown;
} 

const PageError = ({error, description, isDisabled, refetch}: PageErrorInterface) => {
  return (
    <main className="grid min-h-dvh place-items-center p-4">
      <section className="neon-card w-full max-w-md space-y-6 p-6 text-center backdrop-blur-xl sm:p-9">
        <p className="font-display text-2xl font-bold">
          Dink<span className="text-neon-magenta text-glow">Q</span>
        </p>
        <div role="alert" className="space-y-2">
          <h1 className="font-display text-xl font-semibold">{error}</h1>
          {description && <p className="text-sm text-ink-muted">
            {description}
          </p>}
        </div>
        <Button variant="outline" onClick={refetch} disabled={isDisabled}>
          Try again
        </Button>
      </section>
    </main>
  )
}

export default PageError;