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
  if (!session?.="mt-6">
          <HeroScene />
        </div>

        <div className="mt-6">
         
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