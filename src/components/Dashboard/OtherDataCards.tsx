import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatCardData {
  id: string;
  value: string;
  label: string;
  tooltip?: string;
}

const otherData: StatCardData[] = [
  { id: '1', value: '900', label: 'total leads count' },
  { id: '2', value: '12', label: 'days in average to convert lead' },
  { id: '3', value: '30', label: 'inactive leads', tooltip: 'Leads with no activity in the last 30 days.' },
];

const OtherDataCards: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Other data</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherData.map((stat) => (
              <div key={stat.id} className="p-1">
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  {stat.tooltip && (
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground ml-1.5 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs">
                        <p>{stat.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default OtherDataCards;
