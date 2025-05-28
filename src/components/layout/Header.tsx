import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Box, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  className?: string;
}

const BrandLogo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <div className="bg-foreground text-background p-1.5 rounded-sm flex items-center justify-center">
      <Box size={24} strokeWidth={2.5}/> 
    </div>
    {/* <span className="font-bold text-xl text-foreground">LeadsApp</span> */}
  </div>
);

const HeaderActions: React.FC = () => (
  <div className="flex items-center space-x-4">
    {/* Future: Notification, User Profile etc. could go here */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Create
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
        <DropdownMenuItem>New Lead</DropdownMenuItem>
        <DropdownMenuItem>New Contact</DropdownMenuItem>
        <DropdownMenuItem>New Task</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, className }) => {
  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-16 z-40',
        'flex items-center justify-between px-6',
        'bg-card text-card-foreground border-b border-border',
        'md:left-60 left-0', // Full width on mobile, offset by sidebar on desktop
        className
      )}
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden mr-4 text-foreground hover:bg-accent hover:text-accent-foreground">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="hidden md:flex">
          <BrandLogo />
        </div>
      </div>
      <HeaderActions />
    </header>
  );
};

export default Header;
