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
  Box, // Assuming BrandLogo might be part of Sidebar in some designs, or for consistency with Header if needed.
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive?: boolean;
  isSection?: boolean;
}

// Based on SidebarNav from context
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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const SidebarBrandLogo: React.FC = () => (
  <div className="flex items-center space-x-2 px-3 pt-1 pb-5">
    <div className="bg-sidebar-foreground text-sidebar-background p-1.5 rounded-sm flex items-center justify-center">
      <Box size={24} strokeWidth={2.5}/> 
    </div>
    <span className="font-bold text-xl text-sidebar-foreground">LeadsApp</span>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, className }) => {
  const handleLinkClick = () => {
    if (window.innerWidth < 768) { // Equivalent to Tailwind's 'md' breakpoint
      onClose();
    }
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen w-60 bg-sidebar text-sidebar-foreground',
        'flex flex-col justify-between border-r border-sidebar-border z-50',
        'transition-transform duration-300 ease-in-out md:translate-x-0',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        className
      )}
    >
      <div className="flex flex-col p-4 space-y-1">
        <SidebarBrandLogo />
        {mainNavItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-md',
                item.isSection && 'mt-4 pt-4 border-t border-sidebar-border',
                item.isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar',
                item.isActive && 'pointer-events-none'
              )}
            >
              <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.label}
            </a>
          );
        })}
      </div>
      <div className="p-4 space-y-1 border-t border-sidebar-border pt-4">
        {footerNavItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-md',
                'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2 focus:ring-offset-sidebar'
              )}
            >
              <IconComponent className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.label}
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
