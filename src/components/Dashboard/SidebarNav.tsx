import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  FileText,
  FileStack,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  isSection?: boolean;
}

const mainNavItems: NavItem[] = [
  { href: '#', label: 'Dashboard', icon: LayoutGrid, isActive: true },
  { href: '#', label: 'Leads', icon: Users },
  { href: '#', label: 'Customers', icon: Users },
  { href: '#', label: 'Proposals', icon: FileText, isSection: true }, 
  { href: '#', label: 'Invoices', icon: FileStack },
  { href: '#', label: 'Items', icon: ShoppingCart },
  { href: '#', label: 'Mail', icon: Mail, isSection: true },
  { href: '#', label: 'Shoebox', icon: Archive }, 
  { href: '#', label: 'Calendar', icon: CalendarDays },
];

const footerNavItems: NavItem[] = [
  { href: '#', label: 'Help', icon: HelpCircle },
  { href: '#', label: 'Settings', icon: Settings },
];

const SidebarNav: React.FC = () => {
  return (
    <nav
      className={cn(
        'fixed top-0 left-0 h-screen w-60 bg-sidebar text-sidebar-foreground',
        'flex flex-col justify-between p-4 border-r border-sidebar-border'
      )}
    >
      <div className="space-y-1">
        {mainNavItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-md',
                item.isSection && 'mt-4 pt-4 border-t border-sidebar-border',
                item.isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar',
                item.isActive && 'pointer-events-none'
              )}
            >
              <IconComponent className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          );
        })}
      </div>
      <div className="space-y-1 border-t border-sidebar-border pt-4">
        {footerNavItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-md',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar'
              )}
            >
              <IconComponent className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default SidebarNav;
