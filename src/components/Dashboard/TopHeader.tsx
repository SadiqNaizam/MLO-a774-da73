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

interface TopHeaderProps {
  onToggleSidebar?: () => void;
}

const BrandLogo: React.FC = () => (
  <div className="flex items-center space-x-2">
    {/* Using Box as a generic logo placeholder, matching the 'BO' in image somewhat conceptually */}
    <div className="bg-foreground text-background p-1.5 rounded-sm flex items-center justify-center">
      <Box size={24} strokeWidth={2.5}/> 
    </div>
    {/* <span className="font-bold text-xl text-foreground">BO</span> */}
  </div>
);

const HeaderActions: React.FC = () => (
  <div className="flex items-center space-x-4">
    {/* Notification, User Profile etc. could go here */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Create
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>New Lead</DropdownMenuItem>
        <DropdownMenuItem>New Contact</DropdownMenuItem>
        <DropdownMenuItem>New Task</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header
      className={cn(
        'fixed top-0 h-16 bg-card text-card-foreground border-b border-border',
        'flex items-center justify-between px-6',
        'left-0 md:left-60 right-0 z-40' // Adjust left based on sidebar state if responsive
      )}
    >
      <div className="flex items-center">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="md:hidden mr-4">
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <BrandLogo />
      </div>
      <HeaderActions />
    </header>
  );
};

export default TopHeader;
