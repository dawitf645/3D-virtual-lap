import HeroScene from "@/components/three/hero-scene";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">3D Virtual Lab</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Advanced interactive science experiments with immersive 3D simulation.
        </p>
        <div className="mt-10">
          <HeroScene />
        </div>
      </section>
    </main>
  );
}