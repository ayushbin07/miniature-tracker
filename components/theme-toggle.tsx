"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
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
          className="size-8 rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
    );
  }

  return (
    <div className="flex items-center rounded-full bg-muted p-0.5 border border-border">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className={`size-8 rounded-full ${
          theme === "light"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        <Sun className="size-4" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className={`size-8 rounded-full ${
          theme === "dark"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        <Moon className="size-4" />
        <span className="sr-only">Dark theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("system")}
        className={`size-8 rounded-full ${
          theme === "system"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        <Monitor className="size-4" />
        <span className="sr-only">System theme</span>
      </Button>
    </div>
  );
}
