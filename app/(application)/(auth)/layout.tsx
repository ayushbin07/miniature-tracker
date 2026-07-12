import { ReactNode } from "react";
import { Hexagon } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex items-center gap-2 mb-8">
        <Hexagon className="size-10 fill-primary text-primary shrink-0" />
        <span className="text-xl font-bold tracking-tight">Vimars</span>
      </div>
      {children}
    </main>
  );
}