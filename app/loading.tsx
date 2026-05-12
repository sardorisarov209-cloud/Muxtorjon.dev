export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="glass rounded-3xl px-10 py-8 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
        <p className="text-sm text-slate-300">Loading premium chat experience...</p>
      </div>
    </main>
  );
}
