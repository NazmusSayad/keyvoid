import { Loader } from './loader'

export function LoadingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Loader className="text-primary size-[clamp(5rem,10vw,10rem)]" />
    </main>
  )
}
