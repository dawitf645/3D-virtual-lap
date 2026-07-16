import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

function makeExperiments(subject: string) {
  return Array.from({ length: 120 }).map((_, i) => ({
    id: `${subject}-experiment-${i + 1}`,
    title: `${subject.toUpperCase()} Experiment ${i + 1}`,
    level: i < 40 ? "School" : i < 80 ? "College" : "Advanced",
  }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  const { slug } = await params;
  const experiments = makeExperiments(slug);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold capitalize">{slug}</h1>
        <p className="mt-2 text-slate-300">Select any experiment</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {experiments.map((exp) => (
            <Link
              key={exp.id}
              href={`/experiments/${exp.id}`}
              className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >
              <h2 className="font-medium">{exp.title}</h2>
              <p className="text-sm text-slate-300 mt-1">{exp.level}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}