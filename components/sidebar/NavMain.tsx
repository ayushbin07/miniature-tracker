'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/animate-ui/components/radix/sidebar';
import { type NavItem } from '@/components/sidebar/sidebar-data';

interface NavMainProps {
  items: NavItem[];
  label?: string;
}

export function NavMain({ items, label }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' &&
                pathname.startsWith(item.href + '/'));

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className="h-10 rounded-lg px-3 transition-colors"
                >
                  <Link href={item.href}>
                    <item.icon className="size-4 shrink-0" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <SidebarMenuBadge className="ml-auto">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
