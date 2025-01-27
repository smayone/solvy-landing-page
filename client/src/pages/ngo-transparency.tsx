import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, PieChart, BarChart2, Download } from "lucide-react";
import { format } from "date-fns";

interface FinancialMetrics {
  totalDonations: number;
  programExpenses: number;
  administrativeCosts: number;
  grantAllocations: number;
}

interface FinancialRatios {
  programEfficiency: number;
  administrativeRatio: number;
  grantAllocationRatio: number;
}

interface NGOReport {
  organizationInfo: {
    name: string;
    type: string;
    reportingPeriod: string;
    generatedAt: string;
  };
  metrics: FinancialMetrics;
  ratios: FinancialRatios;
  transactionSummary: {
    total: number;
    latestTransaction: string | null;
  };
  transparency: {
    dataCompleteness: string;
    lastUpdated: string;
    verificationStatus: string;
  };
}

interface APIResponse {
  report: NGOReport;
  reportId: number;
}

export default function NGOTransparencyPage() {
  const { data, isLoading, error } = useQuery<APIResponse>({
    queryKey: ['/api/ngo/financial-reports'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading financial report...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">Failed to load financial report</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { report } = data;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{report.organizationInfo.name}</h1>
            <p className="text-muted-foreground">
              Financial Transparency Report - {report.organizationInfo.reportingPeriod}
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Donations
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${report.metrics.totalDonations.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Includes tech company donations and grants
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Program Efficiency
              </CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {report.ratios.programEfficiency}%
              </div>
              <p className="text-xs text-muted-foreground">
                Of total expenses used for programs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Grant Allocation
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {report.ratios.grantAllocationRatio}%
              </div>
              <p className="text-xs text-muted-foreground">
                Of donations allocated to grants
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Administrative Ratio
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {report.ratios.administrativeRatio}%
              </div>
              <p className="text-xs text-muted-foreground">
                Operating cost efficiency
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Financial Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Program Expenses</dt>
                  <dd className="text-sm font-medium">${report.metrics.programExpenses.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Grant Allocations</dt>
                  <dd className="text-sm font-medium">${report.metrics.grantAllocations.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Administrative Costs</dt>
                  <dd className="text-sm font-medium">${report.metrics.administrativeCosts.toLocaleString()}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transparency Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Data Completeness</dt>
                  <dd className="text-sm font-medium">{report.transparency.dataCompleteness}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Last Updated</dt>
                  <dd className="text-sm font-medium">
                    {format(new Date(report.transparency.lastUpdated), 'PPp')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Total Transactions</dt>
                  <dd className="text-sm font-medium">{report.transactionSummary.total}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Verification Status</dt>
                  <dd className="text-sm font-medium capitalize">{report.transparency.verificationStatus}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
