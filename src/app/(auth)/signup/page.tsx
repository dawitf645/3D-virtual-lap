"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error || "Failed");
    router.push(`/verify?email=${encodeURIComponent(form.email)}`);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <input className="w-full rounded bg-slate-900 p-3" placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input className="w-full rounded bg-slate-900 p-3" placeholder="Email" type="email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input className="w-full rounded bg-slate-900 p-3" placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="w-full rounded bg-blue-600 p-3">Sign up</button>
      </form>
    </main>
  );
}