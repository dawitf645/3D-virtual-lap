import "./globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "3D Virtual <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              3D Virtual Lab
            </h1>
            <p className="mt-5 text-slate-300 max-w-xl">
              Experience chemistry, physics, and biology experiments in a full interactive 3D environment.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/signup" className="rounded bg-blue-600 px-5 py-3 font-medium">
                Get Started
              </Link>
              <Link href="/signin" className="rounded border border-white/20 px-5 py-3 font-medium">
                Sign In
              </Link>
            </div>
          </div>
          <HeroScene />
        </div>
      </section>
    </main>
  );
}