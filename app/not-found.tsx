"use client";

import { useRef } from "react";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const confettiRef = useRef<ConfettiRef>(null);
  const router = useRouter();

  return (
    <div className="bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="z-10 flex flex-col items-center justify-center gap-6">
        <span 
          className="pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-[10rem] leading-none font-bold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10"
          onMouseEnter={() => confettiRef.current?.fire({})}
        >
          404
        </span>

        <div className="text-center space-y-2 mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>
          <p className="text-muted-foreground text-sm max-w-[300px] mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <Button 
          onPress={() => router.push("/")}
          className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
          onMouseEnter={() => confettiRef.current?.fire({})}
        >
          Go back home
        </Button>
      </div>

      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-0 size-full pointer-events-none"
        manualstart
      />
    </div>
  );
}
