import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar, FileText, ShieldCheck, Activity, Building2, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface AccountOverview {
  number: string;
  name: string;
  type: string;
  taxTreatment: string;
  category?: string;
  effectiveDate?: string;
}

interface BusinessUnit {
  code: string;
  name: string;
  type: string;
  metadata: Record<string, any>;
  accounts: AccountOverview[];
}

interface AccountsOverview {
  timestamp: string;
  businesses: BusinessUnit[];
}

export default function ManDashboard() {
  const { data: analytics } = useQuery({
    queryKey: ['/api/man/analytics'],
  });

  const { data: accountsOverview } = useQuery<AccountsOverview>({
    queryKey: ['/api/man/accounts/overview'],
  });

  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Mandatory Audit Network</h1>
              <p className="text-muted-foreground">
                Comprehensive tracking and monitoring system powered by Stripe-Taxually integration
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tax Calculations
                </CardTitle>
                <ChartBar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">
                  Via Taxually Integration
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Audit Logs
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">621</div>
                <p className="text-xs text-muted-foreground">
                  Last 24 hours
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reports Generated
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Compliance Score
                </CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">
                  +6% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Owner-only Chart of Accounts Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Chart of Accounts Overview
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Last updated: {accountsOverview?.timestamp ? format(new Date(accountsOverview.timestamp), 'PPpp') : 'Loading...'}
            </p>
          </div>

          <div className="space-y-8">
            {accountsOverview?.businesses.map((business) => (
              <Card key={business.code}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{business.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {business.type.charAt(0).toUpperCase() + business.type.slice(1)} | 
                        Started: {format(new Date(business.metadata.start_date), 'MMMM yyyy')}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {business.accounts.map((account) => (
                      <div
                        key={account.number}
                        className="p-4 rounded-lg border bg-card/50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{account.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Account: {account.number}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                              {account.type}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          <p>Tax Treatment: {account.taxTreatment}</p>
                          {account.category && (
                            <p>Category: {account.category}</p>
                          )}
                          {account.effectiveDate && (
                            <p>Effective: {format(new Date(account.effectiveDate), 'MMM yyyy')}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Tax Report
                </Button>
                <Button className="w-full" variant="outline">
                  <ChartBar className="mr-2 h-4 w-4" />
                  Calculate Multi-Jurisdiction Tax
                </Button>
                <Button className="w-full" variant="outline">
                  <Activity className="mr-2 h-4 w-4" />
                  View Taxually Audit Logs
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Tax Calculations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Placeholder for recent activity */}
                  <p className="text-sm text-muted-foreground">Loading tax calculations...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}