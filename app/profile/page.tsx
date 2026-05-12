import { ArrowLeft, Bell, ShieldCheck, User } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl p-6">
      <div className="glass rounded-3xl p-6">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-slate-300 hover:text-white"><ArrowLeft className="h-4 w-4" />Back to chat</Link>
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-xl font-bold">MU</div>
          <div><h1 className="text-2xl font-semibold">Muxtorjon UI</h1><p className="text-slate-400">@muxtorjon · Online</p></div>
        </div>
        <div className="space-y-3">
          {[{ icon: User, label: "Edit profile" }, { icon: Bell, label: "Notifications" }, { icon: ShieldCheck, label: "Privacy & Security" }].map((item) => (
            <button key={item.label} className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10">
              <item.icon className="h-4 w-4 text-accent" />{item.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
