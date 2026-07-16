"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Verification failed");
      return;
    }

    router.push("/signin");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <form onSubmit={onVerify} className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Verify account</h1>
        <p className="text-sm text-slate-300">Code sent to: {email}</p>
        <input
          className="w-full rounded bg-slate-900 p-3"
          placeholder="6-digit code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button disabled={loading} className="w-full rounded bg-blue-600 p-3 font-medium">
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </main>
  );
}