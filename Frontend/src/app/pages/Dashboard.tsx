import { PageHeader } from "../components/layout/PageHeader";
import { KPICard } from "../components/design-system/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { StatusBadge } from "../components/design-system/StatusBadge";
import { FlaskConical, Trash2, Droplets, AlertTriangle, CheckCircle2, TrendingUp, Award } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useAlertStore, useCertificateStore, useDateFilterStore } from "../store";
import { DateFilter } from "../components/DateFilter";
import { useEffect } from "react";

interface WaterUsageData {
  day: string;
  usage: number;
}

interface WasteData {
  name: string;
  value: number;
  color: string;
}

interface ComplianceData {
  month: string;
  score: number;
}

interface RecentAlert {
  id: number;
  title: string;
  status: "safe" | "warning" | "critical" | "info";
  time: string;
}

const waterUsageData: WaterUsageData[] = [
  { day: "Mon", usage: 1200 },
  { day: "Tue", usage: 1400 },
  { day: "Wed", usage: 1100 },
  { day: "Thu", usage: 1600 },
  { day: "Fri", usage: 1300 },
  { day: "Sat", usage: 900 },
  { day: "Sun", usage: 800 },
];

const wasteData: WasteData[] = [
  { name: "Hazardous", value: 35, color: "#ef4444" },
  { name: "Recyclable", value: 45, color: "#10b981" },
  { name: "General", value: 20, color: "#6b7280" },
];

const complianceData: ComplianceData[] = [
  { month: "Jan", score: 95 },
  { month: "Feb", score: 92 },
  { month: "Mar", score: 97 },
  { month: "Apr", score: 94 },
];

export function Dashboard() {
  // Use global alert store
  const { alerts, acknowledgeAlert } = useAlertStore();
  
  // Get recent unacknowledged alerts
  const recentAlerts = alerts
    .filter(a => !a.acknowledged)
    .slice(0, 4)
    .map(a => ({
      id: a.id,
      title: a.title,
      status: a.status,
      time: new Date(a.timestamp).toLocaleString(),
    }));

  // Use global certificate store
  const { certificates } = useCertificateStore();

  // Use global date filter store
  const { dateRange } = useDateFilterStore();

  useEffect(() => {
    // Add any side effects here if needed
  }, []);

  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Command center for environmental and chemical operations"
      />
      
      {/* Date Filter Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          Showing data for: <span className="font-medium text-foreground">{dateRange.label}</span>
        </div>
        <DateFilter />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Active Chemicals"
          value="247"
          subtitle="12 need attention"
          icon={FlaskConical}
          status="safe"
          trend={{ value: 5, isPositive: true }}
        />
        <KPICard
          title="Compliance Score"
          value="94%"
          subtitle="Above target"
          icon={CheckCircle2}
          status="safe"
          trend={{ value: 2, isPositive: true }}
        />
        <KPICard
          title="Water Usage"
          value="8,400L"
          subtitle="This week"
          icon={Droplets}
          status="warning"
          trend={{ value: 12, isPositive: false }}
        />
        <KPICard
          title="Waste Generated"
          value="450kg"
          subtitle="This month"
          icon={Trash2}
          status="safe"
          trend={{ value: 8, isPositive: true }}
        />
        <KPICard
          title="Certificates"
          value={certificates.length}
          subtitle="Valid certificates"
          icon={Award}
          status="safe"
          trend={{ value: 0, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Water Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              Water Usage Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={waterUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Waste Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-muted-foreground" />
              Waste Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={wasteData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    label
                  >
                    {wasteData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Compliance Score History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar 
                  dataKey="score" 
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-3 bg-muted/50 dark:bg-muted rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                  <StatusBadge status={alert.status}>
                    {alert.status}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}