import { UserForm } from "@/src/features/user/frontend/UserForm";
import { ThemeToggle } from "@/src/shared/ui/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 px-5 py-5 text-stone-900 dark:bg-stone-950 dark:text-stone-100 sm:px-10 sm:py-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-400">Chefcito</p>
        <ThemeToggle />
      </header>
      <div className="mx-auto grid max-w-6xl gap-12 py-16 md:py-24 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-20">
        <section>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-300">Punto de venta para equipos que cocinan</p>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">Tu cocina digital empieza aquí.</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-stone-600 dark:text-stone-400 sm:text-lg">Una base rápida y mantenible para registrar usuarios, operar tu equipo y construir el flujo de tu restaurante con confianza.</p>
          <div className="mt-10 flex flex-wrap gap-2 text-xs font-medium text-stone-600 dark:text-stone-300">
            {['Next.js 16', 'React 19', 'Tailwind 4', 'Prisma 7', 'Zustand', 'Zod'].map((technology) => <span key={technology} className="rounded-full border border-stone-300 px-3 py-2 dark:border-stone-700">{technology}</span>)}
          </div>
        </section>
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5 dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/20 sm:p-8">
          <h2 className="mb-1 text-xl font-semibold">Nuevo usuario</h2>
          <p className="mb-6 text-sm text-stone-500 dark:text-stone-400">Formulario validado con Zod y React Hook Form.</p>
          <UserForm />
        </section>
      </div>
      </main>
  );
}
