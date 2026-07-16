"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-white">
          3D Virtual Lab
        </Link>

        <nav className="flex items-center gap-3">
          {!session?.user ? (
            <>
              <Link href="/signin" className="text-sm text-slate-200">
                Sign in
              </Link>
              <Link href="/signup" className="rounded bg-blue-600 px-3 py-2 text-sm text-white">

                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded bg-white text-black px-3 py-2 text-sm"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}