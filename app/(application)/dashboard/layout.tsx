import { SidebarProvider, SidebarTrigger } from '@/components/animate-ui/components/radix/sidebar';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { AppHeader } from '@/components/app-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/*
       * AppHeader sits at the top of the stacking context.
       * z-50 keeps it above the sidebar container (z-10) at all times.
       */}
      <div className="relative z-50 shrink-0">
        <AppHeader />
      </div>

      <SidebarProvider className="flex-1 overflow-hidden min-h-0!">
        {/*
         * Offset the sidebar so it starts flush below the AppHeader.
         * The AppHeader is h-14 (3.5rem). The sidebar uses fixed inset-y-0,
         * so we override top and height via className to carve out the header.
         */}
        <AppSidebar className="top-14! h-[calc(100svh-3.5rem)]!" />

        <main className="flex w-full flex-col h-full overflow-hidden">
          {/* Sub-header with sidebar trigger */}
          <header className="flex h-12 shrink-0 items-center gap-3 border-b px-4 bg-background">
            <SidebarTrigger />
            <div className="h-4 w-px bg-border" />
            <span className="text-sm font-medium text-muted-foreground">
              Vimars
            </span>
          </header>

          {/* Page content — untouched */}
          <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
