import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'Jan', closedWon: 65, closedLost: 40 },
  { month: 'Feb', closedWon: 59, closedLost: 48 },
  { month: 'March', closedWon: 80, closedLost: 60 },
  { month: 'April', closedWon: 31, closedLost: 28 },
  { month: 'May', closedWon: 56, closedLost: 70 },
  { month: 'June', closedWon: 72, closedLost: 8 },
  { month: 'July', closedWon: 40, closedLost: 30 },
  { month: 'August', closedWon: 92, closedLost: 55 },
];

const timeRangeOptions = [
  { label: 'Last 6 months', value: '6m' as const },
  { label: 'Last 12 months', value: '12m' as const },
  { label: 'This Year', value: 'year' as const },
];

const LeadsTrackingChart: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = React.useState(timeRangeOptions[0]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-3 rounded-md border border-border shadow-lg">
          <p className="label text-sm text-popover-foreground font-medium">{`${label}`}</p>
          {payload.map((pld: any, index: number) => (
            <div key={index} style={{ color: pld.color }} className="text-sm">
              {`${pld.name}: ${pld.value}`}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center space-x-6 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center text-sm text-muted-foreground">
            <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: entry.color }} />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Leads tracking</CardTitle>
            <div className="mt-1 space-x-6">
                <span className="text-3xl font-bold text-foreground">680</span>
                <span className="text-sm text-muted-foreground">total closed</span>
                <span className="text-3xl font-bold text-foreground ml-4">70</span>
                <span className="text-sm text-muted-foreground">total lost</span>
            </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              {selectedTimeRange.label}
              <ChevronDown className="ml-2 h-4 w-4" />
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
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/> {/* accentGreen */} 
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/> {/* accentRed */} 
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                dx={-5} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Area
                type="monotone"
                dataKey="closedWon"
                stroke="#10B981" // accentGreen
                fillOpacity={1}
                fill="url(#colorClosedWon)"
                strokeWidth={2}
                name="Closed won"
                dot={{ stroke: '#10B981', strokeWidth:2, r:4, fill: 'hsl(var(--card))'}}
                activeDot={{ r: 6, strokeWidth:2, fill: 'hsl(var(--card))'}}
              />
              <Area
                type="monotone"
                dataKey="closedLost"
                stroke="#EF4444" // accentRed
                fillOpacity={1}
                fill="url(#colorClosedLost)"
                strokeWidth={2}
                name="Closed lost"
                dot={{ stroke: '#EF4444', strokeWidth:2, r:4, fill: 'hsl(var(--card))'}}
                activeDot={{ r: 6, strokeWidth:2, fill: 'hsl(var(--card))'}}
              />
              <Legend content={<CustomLegend />} verticalAlign="bottom" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
