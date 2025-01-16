import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { format } from "date-fns";

export default function TechCompanies() {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  } | null>(null);

  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['/api/tech-companies'],
  });

  const { data: companyDetails } = useQuery({
    queryKey: ['/api/tech-companies', selectedCompany],
    enabled: !!selectedCompany,
  });

  const { data: donations } = useQuery({
    queryKey: ['/api/tax-donations', {
      companyId: selectedCompany,
      startDate: dateRange?.from,
      endDate: dateRange?.to,
    }],
    enabled: !!selectedCompany && !!dateRange?.from && !!dateRange?.to,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Tech Companies Privacy & Donations</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {isLoadingCompanies ? (
            <p>Loading...</p>
          ) : (
            companies?.map((company) => (
              <Card
                key={company.id}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedCompany === company.id ? "border-primary" : ""
                }`}
                onClick={() => setSelectedCompany(company.id)}
              >
                <CardHeader>
                  <CardTitle>{company.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Privacy Score</span>
                      <Badge variant={company.privacyScore > 7 ? "default" : "destructive"}>
                        {company.privacyScore}/10
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Transparency Score</span>
                      <Badge variant={company.transparencyScore > 7 ? "default" : "destructive"}>
                        {company.transparencyScore}/10
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {selectedCompany && companyDetails && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Privacy Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Case Number</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Filing Date</TableHead>
                      <TableHead>Settlement Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companyDetails.privacyCases.map((case_) => (
                      <TableRow key={case_.id}>
                        <TableCell>{case_.caseNumber}</TableCell>
                        <TableCell>{case_.title}</TableCell>
                        <TableCell>
                          <Badge variant={case_.status === "CLOSED" ? "default" : "secondary"}>
                            {case_.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(new Date(case_.filingDate), "PP")}</TableCell>
                        <TableCell>
                          {case_.settlementAmount
                            ? `$${Number(case_.settlementAmount).toLocaleString()}`
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Select Date Range</h3>
                    <Calendar
                      mode="range"
                      selected={{
                        from: dateRange?.from || new Date(),
                        to: dateRange?.to || new Date(),
                      }}
                      onSelect={(range) => setDateRange(range)}
                    />
                  </div>
                  
                  {donations && (
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={donations}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="donationDate"
                            tickFormatter={(date) => format(new Date(date), "MMM yyyy")}
                          />
                          <YAxis />
                          <Tooltip
                            labelFormatter={(date) => format(new Date(date), "PP")}
                            formatter={(value) => [`$${Number(value).toLocaleString()}`, "Amount"]}
                          />
                          <Bar dataKey="amount" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
