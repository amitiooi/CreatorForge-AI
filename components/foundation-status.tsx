import { appConfig } from '@/lib/app-config'

export function FoundationStatus() {
  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-16 font-sans">
      <section aria-labelledby="project-title" className="flex w-full max-w-lg flex-col gap-4">
        <p className="text-sm font-medium text-muted-foreground">Project foundation</p>
        <h1 id="project-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {appConfig.name}
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          The application scaffold is ready for development. Product features and
          external services have not been configured.
        </p>
      </section>
    </main>
  )
}
