import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-10 w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent", className)} {...props} />;
}
