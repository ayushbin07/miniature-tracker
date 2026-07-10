import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AppHeader />
      <SidebarProvider className="flex-1 overflow-hidden min-h-0! transform">
        <AppSidebar />
        <main className="flex w-full flex-col h-full overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-4 border-b px-6 bg-background">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold hidden md:block">Vimars</h1>
          </header>
          <div className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
