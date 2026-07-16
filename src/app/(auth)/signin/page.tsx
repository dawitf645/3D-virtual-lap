"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onCredentials(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid credentials or email not verified");
      return;
    }

    router.push("/dashboard");
  }

  async function onGoogle() {
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>

        <form onSubmit={onCredentials} className="space-y-3">
          <input
            className="w-full rounded bg-slate-900 p-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded bg-slate-900 p-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button disabled={loading} className="w-full rounded bg-blue-600 p-3 font-medium">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <button onClick={onGoogle} className="w-full rounded bg-white text-black p-3 font-medium">
          Continue with Google
        </button>
      </div>
    </main>
  );
}