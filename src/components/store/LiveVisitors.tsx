import { useEffect, useState } from "react";

export function LiveVisitors() {
  const [count, setCount] = useState(87);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(Math.floor(50 + Math.random() * 101));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 hidden items-center gap-2.5 rounded-full border border-border/70 bg-background/90 px-4 py-2.5 shadow-[var(--shadow-card)] backdrop-blur sm:flex">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-royal/60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-royal" />
      </span>
      <span className="text-xs font-semibold text-foreground/80">
        {count} people are viewing this store right now
      </span>
    </div>
  );
}
