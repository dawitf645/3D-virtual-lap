import HeroScene from "@/components/three/hero-scene";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  const { id } = await params;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Experiment: {id}</h1>
        <p className="mt-2 text-slate-300">Interactive 3D simulation view</p>

        <div className="mt-6">
          <HeroScene />
        </div>

        <div className="mt-6">
          <Link
            href={`/experiments/${id}/quiz`}
            className="inline-block rounded bg-blue-600 px-5 py-3 font-medium"
          >
            Take Quiz
          </Link>
        </div>
      </div>
    </main>
  );
}