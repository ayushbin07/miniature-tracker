"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CheckSquare,
  ListTodo,
  StickyNote,
  Tags,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Avatar, Chip } from "@heroui/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Habits", url: "/dashboard/habits", icon: CheckSquare },
  { title: "Tasks", url: "/dashboard/tasks", icon: ListTodo, badge: "New" },
  { title: "Notes", url: "/dashboard/notes", icon: StickyNote },
  { title: "Categories", url: "/dashboard/categories", icon: Tags },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

const bottomNavItems = [
  { title: "Help & Information", url: "/dashboard/help", icon: HelpCircle },
  { title: "Log out", url: "/", icon: LogOut },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props} className="top-14! h-[calc(100svh-3.5rem)]!">


      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.url ||
                  (pathname?.startsWith(item.url + "/") && item.url !== "/dashboard");

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={isActive}
                      className="h-11 rounded-xl px-3 transition-colors text-foreground/70 hover:bg-default-100 hover:text-foreground data-active:bg-primary data-active:text-primary-foreground data-active:font-medium data-active:shadow-sm"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-3">
                          <item.icon className="size-5" />
                          <span className="text-[15px]">{item.title}</span>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu className="gap-1">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  isActive={isActive}
                  className="h-11 rounded-xl px-3 transition-colors text-foreground/70 hover:bg-default-100 hover:text-foreground data-active:bg-primary data-active:text-primary-foreground data-active:font-medium data-active:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="size-5" />
                    <span className="text-[15px]">{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <div className="flex items-center gap-3 px-2 mt-2">
          <Avatar>
            <Avatar.Image src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Vimars User" />
            <Avatar.Fallback>VU</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <span className="font-medium text-sm truncate">Vimars User</span>
            <span className="text-xs text-default-500 truncate">Admin</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
