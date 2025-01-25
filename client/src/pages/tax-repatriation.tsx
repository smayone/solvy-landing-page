import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function TaxRepatriation() {
  const [location, setLocation] = useLocation();

  // Check access permissions
  const { data: accessPermissions, isLoading: checkingAccess } = useQuery({
    queryKey: ['/api/access/tax-repatriation'],
  });

  // Redirect if no access
  useEffect(() => {
    if (!checkingAccess && !accessPermissions?.hasAccess) {
      setLocation('/');
    }
  }, [accessPermissions, checkingAccess, setLocation]);

  // Fetch repatriation data
  const { data: repatriationData, isLoading: loadingData } = useQuery({
    queryKey: ['/api/tax-repatriation'],
    enabled: !!accessPermissions?.hasAccess,
  });

  if (checkingAccess || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!accessPermissions?.hasAccess) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Tax Repatriation Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage tax repatriation cases for companies involved in DOJ privacy cases
            </p>
          </div>
          <Badge variant={accessPermissions.role === 'owner' ? 'default' : 'secondary'}>
            {accessPermissions.role.toUpperCase()}
          </Badge>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Repatriation Amount</CardTitle>
              <CardDescription>Across all cases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${repatriationData?.summary.totalAmount.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Active Cases</CardTitle>
              <CardDescription>Pending processing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {repatriationData?.summary.activeCases}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Completed Cases</CardTitle>
              <CardDescription>Successfully processed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {repatriationData?.summary.completedCases}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Repatriation Timeline Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Repatriation Timeline</CardTitle>
            <CardDescription>Amount processed over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={repatriationData?.timeline}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => format(new Date(date), "MMM yyyy")}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(date) => format(new Date(date), "PP")}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Amount"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Repatriation Cases Table */}
        <Card>
          <CardHeader>
            <CardTitle>Repatriation Cases</CardTitle>
            <CardDescription>Detailed view of all cases</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Filing Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Privacy Case</TableHead>
                  <TableHead>Destination</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repatriationData?.cases.map((case_) => (
                  <TableRow key={case_.id}>
                    <TableCell className="font-medium">{case_.companyName}</TableCell>
                    <TableCell>${case_.amount.toLocaleString()}</TableCell>
                    <TableCell>{format(new Date(case_.filingDate), "PP")}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          case_.status === "completed" ? "default" :
                          case_.status === "pending" ? "secondary" :
                          "destructive"
                        }
                      >
                        {case_.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{case_.privacyCaseNumber}</TableCell>
                    <TableCell>{case_.destinationCountry}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
