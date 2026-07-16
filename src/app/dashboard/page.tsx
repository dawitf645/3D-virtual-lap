import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const subjects = [
  { slug: "chemistry", title: "Chemistry", count: 120 },
  { slug: "physics", title: "Physics", count: 120 },
  { slug: "biology", title: "Biology", count: 120 },
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Start Experiments</h1>
        <p className="mt-2 text-slate-300">Choose one subject and continue.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {subjects.map((s) => (
            <Link
              key={s.slug}
              href={`/subjects/${s.slug}`}
              className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
            >
              <h2 className="text-xl font-medium">{s.title}</h2>
              <p className="text-slate-300 mt-2">{s.count}+ experiments</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}