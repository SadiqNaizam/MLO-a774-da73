import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import FunnelMetrics from '../components/Dashboard/FunnelMetrics';
import SourcePieChart from '../components/Dashboard/SourcePieChart';
import LeadsTrackingChart from '../components/Dashboard/LeadsTrackingChart';
import LostReasonsGrid from '../components/Dashboard/LostReasonsGrid';
import OtherDataCards from '../components/Dashboard/OtherDataCards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LeadsDashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      <PageHeader title="Dashboard" />

      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="inline-flex items-center justify-start p-0 bg-transparent gap-x-6">
          <TabsTrigger 
            value="sales" 
            className="px-1 pb-2 text-base font-medium text-muted-foreground hover:text-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Sales
          </TabsTrigger>
          <TabsTrigger 
            value="leads" 
            className="px-1 pb-2 text-base font-medium text-muted-foreground hover:text-primary data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Leads
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-6">
          <div className="p-6 bg-card rounded-lg shadow">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Sales Overview</h2>
            <p className="text-card-foreground/80">
              Sales analytics and data will be displayed here. This section is currently a placeholder.
            </p>
            {/* Placeholder content for Sales tab can be expanded here */}
          </div>
        </TabsContent>

        <TabsContent value="leads" className="mt-6">
          <div className="flex flex-col gap-6">
            {/* Row 1: Funnel Metrics and Source Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <FunnelMetrics />
              </div>
              <div className="lg:col-span-3">
                <SourcePieChart />
              </div>
            </div>

            {/* Row 2: Leads Tracking Chart */}
            <LeadsTrackingChart />

            {/* Row 3: Lost Reasons Grid and Other Data Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LostReasonsGrid />
              <OtherDataCards />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainAppLayout>
  );
};

export default LeadsDashboardPage;
