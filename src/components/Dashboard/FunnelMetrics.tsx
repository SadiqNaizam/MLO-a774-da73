import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  name: string;
  count: number;
  value: number;
  avgTime: string;
  color: string;
}

const funnelData: FunnelStage[] = [
  { name: 'Discovery', count: 200, value: 200, avgTime: '2 days', color: 'bg-accentRed' }, // Using accentRed from config for #EF4444
  { name: 'Qualified', count: 100, value: 100, avgTime: '2 days', color: 'bg-accentYellow' }, // Using accentYellow from config for #FBBF24
  { name: 'In conversation', count: 50, value: 100, avgTime: 'average time on this stage', color: 'bg-slate-600' }, // Image: dark blue/gray
  { name: 'Negotiations', count: 20, value: 50, avgTime: '8 days', color: 'bg-accentGreen' }, // Using accentGreen from config for #10B981
  { name: 'Closed won', count: 20, value: 50, avgTime: '10 days', color: 'bg-purple-500' }, // Image: purple
];

const FunnelMetrics: React.FC = () => {
  const totalActiveLeadsInStages = funnelData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel count</CardTitle>
        <div className="text-3xl font-bold text-foreground mt-1">
          600 <span className="text-base font-normal text-muted-foreground">active leads</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex w-full h-3 rounded-full overflow-hidden bg-muted">
            {funnelData.map((stage) => (
              <div
                key={stage.name}
                className={cn('h-full', stage.color)}
                style={{ width: `${(stage.count / totalActiveLeadsInStages) * 100}%` }}
                title={`${stage.name}: ${stage.count}`}
              />
            ))}
          </div>
        </div>
        
        <TooltipProvider>
          <div className="space-y-3 text-sm">
            {funnelData.map((stage) => (
              <div key={stage.name} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-4 py-1.5">
                <div className={cn('w-3 h-3 rounded-sm mr-2', stage.color)} />
                <span className="text-foreground font-medium whitespace-nowrap">{stage.name}</span>
                <span className="text-muted-foreground justify-self-end tabular-nums">{stage.count}</span>
                <span className="text-muted-foreground justify-self-end tabular-nums">$ {stage.value}</span>
                {stage.name === 'In conversation' ? (
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <span className="text-muted-foreground justify-self-end cursor-default tabular-nums underline decoration-dashed decoration-muted-foreground/50 underline-offset-2">
                        {stage.avgTime.length > 10 ? '2 days' : stage.avgTime} {/* Shorten if it's the specific tooltip text */}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-foreground text-background text-xs p-2 rounded-sm shadow-lg">
                      <p>{stage.avgTime}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <span className="text-muted-foreground justify-self-end tabular-nums">{stage.avgTime}</span>
                )}
              </div>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default FunnelMetrics;
