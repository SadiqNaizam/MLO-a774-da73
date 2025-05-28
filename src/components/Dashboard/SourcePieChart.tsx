import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SourceDataPoint {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const leadsCameData: SourceDataPoint[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#EF4444' }, // accentRed
  { name: 'Behance', value: 1000, percentage: 40, color: '#FBBF24' }, // accentYellow
  { name: 'Instagram', value: 1000, percentage: 10, color: '#14B8A6' }, // teal-500
  { name: 'Dribbble', value: 1000, percentage: 10, color: '#84CC16' }, // lime-500
];

const leadsConvertedData: SourceDataPoint[] = [
  { name: 'Clutch', value: 1500, percentage: 45, color: '#EF4444' },
  { name: 'Behance', value: 800, percentage: 35, color: '#FBBF24' },
  { name: 'Instagram', value: 600, percentage: 12, color: '#14B8A6' },
  { name: 'Dribbble', value: 400, percentage: 8, color: '#84CC16' },
];

const totalDealsSizeData: SourceDataPoint[] = [
  { name: 'Clutch', value: 50000, percentage: 60, color: '#EF4444' },
  { name: 'Behance', value: 20000, percentage: 25, color: '#FBBF24' },
  { name: 'Instagram', value: 8000, percentage: 10, color: '#14B8A6' },
  { name: 'Dribbble', value: 4000, percentage: 5, color: '#84CC16' },
];

const dataMap = {
  leadsCame: leadsCameData,
  leadsConverted: leadsConvertedData,
  totalDeals: totalDealsSizeData,
};

type TabValue = 'leadsCame' | 'leadsConverted' | 'totalDeals';

const SourcePieChart: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TabValue>('leadsCame');
  const chartData = dataMap[activeTab];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60} // For Donut shape
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="hsl(var(--card))" // To create separation lines like in image
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string, props: { payload: SourceDataPoint }) => [`$${value}`, props.payload.name]}
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                  itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                  cursor={{ fill: 'hsla(var(--accent), 0.5)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 text-sm">
            {chartData.map((source) => (
              <div key={source.name} className="flex items-center justify-between py-1">
                <div className="flex items-center">
                  <span style={{ backgroundColor: source.color }} className="w-3 h-3 rounded-sm mr-2"></span>
                  <span className="text-foreground">{source.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground tabular-nums">$ {source.value.toLocaleString()}</span>
                  <span className="text-foreground font-medium w-10 text-right tabular-nums">{source.percentage}%</span>
                </div>
              </div>
            ))}
             <div className="flex items-center justify-end pt-2 text-xs text-muted-foreground">
                <span>from leads total</span> {/* As per image tooltip */} 
            </div>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="leadsCame">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDeals">Total deals size</TabsTrigger>
          </TabsList>
          {/* TabsContent not strictly needed if chart & table update directly */}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SourcePieChart;
