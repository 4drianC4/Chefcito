import { UserForm } from "@/src/features/user/frontend/UserForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100 sm:px-12">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
        <section>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">Chefcito / stack listo</p>
          <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-white sm:text-7xl">Tu cocina digital empieza aquí.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">Next.js, Prisma y PostgreSQL preparados para construir una experiencia de punto de venta rápida y mantenible.</p>
          <div className="mt-10 flex flex-wrap gap-2 text-xs font-medium text-slate-300">
            {['Next.js 16', 'React 19', 'Tailwind 4', 'Prisma 7', 'Zustand', 'Zod'].map((technology) => <span key={technology} className="rounded-full border border-slate-800 px-3 py-2">{technology}</span>)}
          </div>
        </section>
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/30">
          <h2 className="mb-1 text-xl font-semibold">Nuevo usuario</h2>
          <p className="mb-6 text-sm text-slate-400">Formulario validado con Zod y React Hook Form.</p>
          <UserForm />
        </section>
      </div>
      </main>
  );
}
