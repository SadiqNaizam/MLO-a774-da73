import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LostReason {
  id: string;
  percentage: number;
  reason: string;
}

const lostReasonsData: LostReason[] = [
  { id: '1', percentage: 40, reason: 'The proposal is unclear' },
  { id: '2', percentage: 20, reason: 'However venture pursuit' }, // This text seems a bit off, but using as per image
  { id: '3', percentage: 10, reason: 'Other' },
  { id: '4', percentage: 30, reason: 'The proposal is unclear' }, // Duplicate reason for visual consistency with image
];

const LostReasonsGrid: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {lostReasonsData.map((item) => (
            <div key={item.id}>
              <p className="text-3xl font-bold text-foreground">{item.percentage}%</p>
              <p className="text-sm text-muted-foreground mt-1">{item.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LostReasonsGrid;
