import { cookies } from 'next/headers';
import { SidebarProvider, SidebarTrigger } from '@/components/animate-ui/components/radix/sidebar';
import { AppSidebar } from '@/components/sidebar/AppSidebar';
import { AppHeader } from '@/components/app-header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get('sidebar_state');
  const defaultOpen = sidebarState ? sidebarState.value === 'true' : true;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="relative z-50 shrink-0">
        <AppHeader />
      </div>

      <SidebarProvider defaultOpen={defaultOpen} className="flex-1 overflow-hidden min-h-0!">
        <AppSidebar className="top-14! h-[calc(100svh-3.5rem)]! border-none! pl-1" />

        <main className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-default shadow-sm m-2 ring-1 ring-border/50">
          {/* Sub-header with sidebar trigger */}
          <header className="flex h-12 shrink-0 items-center gap-3 border-b px-4">
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
