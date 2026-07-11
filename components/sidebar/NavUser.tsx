"use client";

import { LogOut } from "lucide-react";

import { Avatar } from "@heroui/react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/animate-ui/components/radix/sidebar";
import { type UserData } from "@/components/sidebar/sidebar-data";

interface NavUserProps {
  user: UserData;
  onSignOut?: () => void;
}

export function NavUser({ user, onSignOut }: NavUserProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <SidebarFooter className="border-t border-sidebar-border pb-2">
      {/* User info */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <Avatar className="size-8 rounded-lg shrink-0">
              {user.avatarUrl && (
                <Avatar.Image src={user.avatarUrl} alt={user.name} />
              )}
              <Avatar.Fallback className="rounded-lg text-xs">
                {initials}
              </Avatar.Fallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Sign out */}
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            tooltip="Sign out"
            className="h-9 rounded-lg px-3 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
            onClick={onSignOut}
          >
            <LogOut className="size-4 shrink-0" />
            <span>Sign out</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
