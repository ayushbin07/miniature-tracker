import {
  Search,
  Star,
  Languages,
  Sun,
  Moon,
  Monitor,
  Hexagon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between bg-background px-4 text-foreground border-b border-border">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Hexagon className="size-6 fill-primary text-primary" />
          <span className="text-xl font-bold tracking-tight">Vimars</span>
        </div>
        <button className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          v2.1.0-beta.1
        </button>
      </div>

      {/* Middle section */}
      <div className="flex flex-1 items-center justify-center px-4">
        <button className="flex h-9 w-full max-w-md items-center justify-between rounded-full border border-border bg-muted/50 px-4 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <div className="flex items-center gap-2">
            <Search className="size-4" />
            <span>Search</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <kbd className="rounded bg-background px-1.5 py-0.5 font-sans border border-border">
              Ctrl
            </kbd>
            <kbd className="rounded bg-background px-1.5 py-0.5 font-sans border border-border">K</kbd>
          </div>
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="h-9 rounded-full bg-muted/50 px-4 text-muted-foreground hover:bg-accent hover:text-accent-foreground text-sm gap-2"
        >
          <Star className="size-4" />
          Give a star at Github?
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 rounded-full bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Languages className="size-4" />
        </Button>

        {/* Theme Toggles */}
        <Button
          variant="ghost"
          className="h-9 rounded-full bg-muted/50 px-4 text-muted-foreground hover:bg-accent hover:text-accent-foreground text-sm"
        >
          Theme
        </Button>
        <div className="flex items-center rounded-full bg-muted p-0.5 border border-border">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Sun className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full bg-background text-foreground shadow-sm"
          >
            <Moon className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Monitor className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
