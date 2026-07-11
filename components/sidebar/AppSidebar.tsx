'use client';

import {
  Sidebar,
  SidebarContent,
} from '@/components/animate-ui/components/radix/sidebar';
import { NavMain }   from '@/components/sidebar/NavMain';
import { NavBottom } from '@/components/sidebar/NavBottom';
import { NavUser }   from '@/components/sidebar/NavUser';
import { mainNav, bottomNav, type UserData } from '@/components/sidebar/sidebar-data';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: UserData;
}

export function AppSidebar({
  user = {
    name: 'Vimars User',
    email: 'user@vimars.app',
  },
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>


      {/* ── Main navigation ───────────────────────────────────────────── */}
      <SidebarContent>
        <NavMain items={mainNav} />
        <NavBottom items={bottomNav} />
      </SidebarContent>

      {/* ── User section ──────────────────────────────────────────────── */}
      <NavUser user={user} />

    </Sidebar>
  );
}
