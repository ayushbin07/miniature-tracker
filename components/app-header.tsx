import React from "react";
import { 
  Search, 
  ChevronDown, 
  Star, 
  Languages,
  Sun,
  Moon,
  Monitor,
  Hexagon
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 text-white">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Hexagon className="size-6 fill-white text-white" />
          <span className="text-xl font-bold tracking-tight">Vimars</span>
        </div>
        <button className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white">
          v2.1.0-beta.1
          <ChevronDown className="size-4" />
        </button>
      </div>

      {/* Middle section */}
      <div className="flex flex-1 items-center justify-center px-4">
        <button className="flex h-9 w-full max-w-md items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white/50 hover:bg-white/10 hover:text-white/70 transition-colors">
          <div className="flex items-center gap-2">
            <Search className="size-4" />
            <span>Search</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-sans">Ctrl</kbd>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-sans">K</kbd>
          </div>
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" className="h-9 rounded-full bg-white/5 px-4 text-white/70 hover:bg-white/10 hover:text-white text-sm">
          Theme
        </Button>
        <Button variant="ghost" className="h-9 rounded-full bg-white/5 px-4 text-white/70 hover:bg-white/10 hover:text-white text-sm gap-2">
          <Star className="size-4 fill-white/70" />
          29.9k
        </Button>
        <Button variant="ghost" size="icon" className="size-9 rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white">
          <Languages className="size-4" />
        </Button>
        
        {/* Theme Toggles */}
        <div className="flex items-center rounded-full bg-white/5 p-0.5">
          <Button variant="ghost" size="icon" className="size-8 rounded-full text-white/70 hover:bg-white/10 hover:text-white">
            <Sun className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 rounded-full bg-white/20 text-white shadow-sm hover:bg-white/20 hover:text-white">
            <Moon className="size-4" />
          </Button>
          <Button variant="ghost" size="icon" className="size-8 rounded-full text-white/70 hover:bg-white/10 hover:text-white">
            <Monitor className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
