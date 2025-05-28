import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface PageHeaderProps {
  title: string;
}

const timeRangeOptions = [
  { label: 'Last 6 months', value: '6m' as const },
  { label: 'Last 3 months', value: '3m' as const },
  { label: 'Last 30 days', value: '30d' as const },
  { label: 'Last 7 days', value: '7d' as const },
  { label: 'All time', value: 'all' as const },
];

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState(timeRangeOptions[0]);

  return (
    <div className={cn('flex items-center justify-between mb-6')}>
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[180px] justify-start text-left font-normal">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="flex-1">{selectedTimeRange.label}</span>
              <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeRangeOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onSelect={() => setSelectedTimeRange(option)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PageHeader;
