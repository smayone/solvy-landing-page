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
  Activity,
  Database,
  Server,
  CreditCard,
  Clock,
  HardDrive,
  Cpu,
  CircuitBoard,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Type definitions for API responses
interface HealthStatus {
  status: "ok" | "error" | "unknown";
  message?: string;
}

interface SystemHealth {
  status: "healthy" | "degraded" | "error";
  checks: {
    api: HealthStatus;
    database: HealthStatus;
    stripe: HealthStatus;
    timestamp: string;
  };
  metrics?: {
    memory: NodeJS.MemoryUsage;
    uptime: number;
    lastRestart?: string;
  };
  environment: string;
  version: string;
}

interface DetailedSystemMetrics {
  cpu: {
    usage: number;
    load: number[];
  };
  memory: NodeJS.MemoryUsage;
  disk: {
    total: number;
    free: number;
  };
}

interface AccessPermissions {
  hasAccess: boolean;
  role?: string;
}

// Utility function to format bytes to human-readable format
function formatBytes(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

export default function MonitoringDashboard() {
  const [location, setLocation] = useLocation();

  // Check access permissions
  const { data: accessPermissions, isLoading: checkingAccess } = useQuery<AccessPermissions>({
    queryKey: ['/api/access/monitoring'],
    retry: false,
  });

  // Redirect if no access
  useEffect(() => {
    if (!checkingAccess && (!accessPermissions?.hasAccess || accessPermissions?.role !== 'owner')) {
      setLocation('/');
    }
  }, [accessPermissions, checkingAccess, setLocation]);

  // Fetch health data
  const { data: healthData, isLoading: loadingHealth } = useQuery<SystemHealth>({
    queryKey: ['/api/health/detailed'],
    enabled: !!accessPermissions?.hasAccess,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Fetch detailed metrics
  const { data: metricsData, isLoading: loadingMetrics } = useQuery<DetailedSystemMetrics>({
    queryKey: ['/api/health/metrics'],
    enabled: !!accessPermissions?.hasAccess,
    refetchInterval: 30000,
  });

  if (checkingAccess || loadingHealth || loadingMetrics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading system status...</p>
      </div>
    );
  }

  if (!accessPermissions?.hasAccess || accessPermissions.role !== 'owner') {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">System Monitoring Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time system health and deployment status monitoring
            </p>
          </div>
          <Badge variant="outline">
            Environment: {healthData?.environment.toUpperCase()}
          </Badge>
        </div>

        {/* System Status Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Status</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant={healthData?.checks.api.status === 'ok' ? 'default' : 'destructive'}>
                {healthData?.checks.api.status.toUpperCase()}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database Status</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant={healthData?.checks.database.status === 'ok' ? 'default' : 'destructive'}>
                {healthData?.checks.database.status.toUpperCase()}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stripe Status</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Badge variant={healthData?.checks.stripe.status === 'ok' ? 'default' : 'destructive'}>
                {healthData?.checks.stripe.status.toUpperCase()}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.floor((healthData?.metrics?.uptime || 0) / 3600)}h {Math.floor(((healthData?.metrics?.uptime || 0) % 3600) / 60)}m
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Memory Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CircuitBoard className="h-5 w-5" />
                Memory Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Heap Used</span>
                  <span>{formatBytes(metricsData?.memory.heapUsed || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Heap Total</span>
                  <span>{formatBytes(metricsData?.memory.heapTotal || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">RSS</span>
                  <span>{formatBytes(metricsData?.memory.rss || 0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CPU Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Usage</span>
                  <span>{(metricsData?.cpu.usage || 0).toFixed(2)}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Load Average</span>
                  <span>{metricsData?.cpu.load.map(load => load.toFixed(2)).join(', ') || '0, 0, 0'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disk Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Disk Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Space</span>
                  <span>{formatBytes(metricsData?.disk.total || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Free Space</span>
                  <span>{formatBytes(metricsData?.disk.free || 0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Last Restart Time */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>Additional deployment and system details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Last Restart</span>
                <span>{new Date(healthData?.metrics?.lastRestart || Date.now()).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Version</span>
                <span>{healthData?.version || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Environment</span>
                <span>{healthData?.environment || 'development'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}