import { Spinner } from "../ui/spinner";

interface PageLoadingProps {
  message?: string;
}

const PageLoading = ({message}: PageLoadingProps) => {
  return (
    <div className='flex flex-col gap-4 min-h-screen items-center justify-center'>
      <Spinner className="text-primary size-20" />
      {message && <p className="text-sm text-ink-muted">{message}</p>}
    </div>
  )
}

export default PageLoading;