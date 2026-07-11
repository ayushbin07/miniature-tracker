import {
  Home,
  CheckSquare,
  ListTodo,
  StickyNote,
  Tags,
  Settings,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  /** Optional badge label shown next to the title */
  badge?: string;
}

export interface UserData {
  name: string;
  email: string;
  avatarUrl?: string;
}

// ---------------------------------------------------------------------------
// Navigation data
// ---------------------------------------------------------------------------

export const mainNav: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: Home },
  { title: 'Habits',    href: '/dashboard/habits',     icon: CheckSquare },
  { title: 'Tasks',     href: '/dashboard/tasks',      icon: ListTodo,   badge: 'New' },
  { title: 'Notes',     href: '/dashboard/notes',      icon: StickyNote },
  { title: 'Categories',href: '/dashboard/categories', icon: Tags },
];

export const bottomNav: NavItem[] = [
  { title: 'Settings',        href: '/dashboard/settings', icon: Settings },
  { title: 'Help & Support',  href: '/dashboard/help',     icon: HelpCircle },
];
