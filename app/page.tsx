"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Image, Mic, Paperclip, Search, Send, Settings, Smile, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const chats = [
  { name: "Design Team", message: "New prototype is ready 🚀", unread: 3, online: true },
  { name: "Alex Mercer", message: "Can you review voice notes?", unread: 0, online: true },
  { name: "Product Squad", message: "Daily sync at 10:30", unread: 9, online: false }
];

const messages = [
  { me: false, text: "Hey! I uploaded the updated UI assets.", time: "10:42", type: "text" },
  { me: true, text: "Awesome. The gradients look premium.", time: "10:43", type: "text", reactions: ["🔥", "💙"] },
  { me: false, text: "voice", time: "10:45", type: "voice" },
  { me: false, text: "preview", time: "10:46", type: "file" }
];

export default function HomePage() {
  const [message, setMessage] = useState("");
  return (
    <main className="min-h-screen p-3 md:p-6">
      <section className="glass mx-auto grid h-[95vh] max-w-7xl grid-cols-1 overflow-hidden rounded-3xl md:grid-cols-[310px_1fr]">
        <aside className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Chats</h1>
            <Bell className="h-5 w-5 text-slate-300" />
          </div>
          <Input placeholder="Search chats..." className="mb-4" />
          <div className="space-y-2">
            {chats.map((chat) => (
              <button key={chat.name} className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{chat.name}</p>
                    <p className="text-sm text-slate-400">{chat.message}</p>
                  </div>
                  {chat.unread > 0 && <span className="rounded-full bg-accent px-2 py-0.5 text-xs">{chat.unread}</span>}
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400"><span className={`h-2 w-2 rounded-full ${chat.online ? "bg-emerald-400" : "bg-slate-500"}`} />{chat.online ? "Online" : "Away"}</div>
              </button>
            ))}
          </div>
        </aside>

        <div className="flex flex-col">
          <header className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/90" />
              <div><p className="font-semibold">Design Team</p><p className="text-xs text-emerald-400">typing...</p></div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Search className="h-4 w-4" /></Button>
              <Dialog>
                <DialogTrigger asChild><Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button></DialogTrigger>
                <DialogContent>
                  <DialogTitle className="mb-4 text-lg">Settings</DialogTitle>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="rounded-xl border border-white/10 p-3">Theme: Dark (default)</div>
                    <div className="rounded-xl border border-white/10 p-3">Notifications: Enabled</div>
                    <div className="rounded-xl border border-white/10 p-3">Privacy: Premium mode</div>
                  </div>
                </DialogContent>
              </Dialog>
              <Link href="/profile"><Button variant="ghost" size="icon"><User className="h-4 w-4" /></Button></Link>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`max-w-[80%] rounded-2xl p-3 shadow-lg ${msg.me ? "ml-auto bg-accent text-white" : "bg-slate-800/90"}`}>
                {msg.type === "text" && <p>{msg.text}</p>}
                {msg.type === "voice" && <div className="flex items-center gap-2"><Mic className="h-4 w-4" /><div className="h-1 flex-1 rounded-full bg-white/30" /><span className="text-xs">0:18</span></div>}
                {msg.type === "file" && <div className="space-y-2"><div className="flex items-center gap-2"><Image className="h-4 w-4" />cover-preview.png</div><div className="h-24 rounded-xl bg-gradient-to-r from-accent/50 to-purple-500/50" /></div>}
                <div className="mt-1 flex items-center justify-between text-[11px] opacity-80"><span>{msg.time}</span><div className="flex gap-1">{msg.reactions?.map((r) => <button key={r} className="rounded-full bg-white/20 px-1.5">{r}</button>)}<button className="rounded-full bg-white/20 px-1.5"><Smile className="h-3 w-3" /></button></div></div>
              </div>
            ))}
            <div className="flex items-center gap-1 text-slate-400">
              <span className="h-2 w-2 animate-pulseDot rounded-full bg-accent" />
              <span className="h-2 w-2 animate-pulseDot rounded-full bg-accent [animation-delay:0.2s]" />
              <span className="h-2 w-2 animate-pulseDot rounded-full bg-accent [animation-delay:0.4s]" />
              <span className="text-xs">Design Team is typing...</span>
            </div>
          </div>

          <footer className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon"><Paperclip className="h-4 w-4" /></Button>
              <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write a message..." className="flex-1" />
              <Button variant="ghost" size="icon"><Mic className="h-4 w-4" /></Button>
              <Button><Send className="mr-2 h-4 w-4" />Send</Button>
            </div>
          </footer>
        </div>
      </section>

      <nav className="glass fixed bottom-3 left-1/2 flex w-[92%] max-w-md -translate-x-1/2 items-center justify-around rounded-2xl p-2 md:hidden">
        {["Chats", "Calls", "Profile"].map((item) => <button key={item} className="rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-white/10">{item}</button>)}
      </nav>
    </main>
  );
}
