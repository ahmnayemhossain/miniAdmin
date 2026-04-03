import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Droplets, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const dailyUsageData = [
  { day: "Mon", usage: 1200, target: 1000, breakdown: { production: 700, cleaning: 300, cooling: 200 } },
  { day: "Tue", usage: 1400, target: 1000, breakdown: { production: 800, cleaning: 350, cooling: 250 } },
  { day: "Wed", usage: 1100, target: 1000, breakdown: { production: 650, cleaning: 280, cooling: 170 } },
  { day: "Thu", usage: 1600, target: 1000, breakdown: { production: 950, cleaning: 400, cooling: 250 } },
  { day: "Fri", usage: 1300, target: 1000, breakdown: { production: 750, cleaning: 320, cooling: 230 } },
  { day: "Sat", usage: 900, target: 1000, breakdown: { production: 500, cleaning: 250, cooling: 150 } },
  { day: "Sun", usage: 800, target: 1000, breakdown: { production: 450, cleaning: 220, cooling: 130 } },
];

const departmentUsage = [
  { department: "Production", usage: 4800, percentage: 60 },
  { department: "Cleaning", usage: 2100, percentage: 26 },
  { department: "Cooling", usage: 1100, percentage: 14 },
];

const alerts = [
  {
    id: 1,
    title: "High usage detected on Thursday",
    description: "Usage exceeded target by 60%",
    severity: "warning",
    date: "Mar 28, 2026",
  },
  {
    id: 2,
    title: "Unusual spike in Production dept",
    description: "30% above normal consumption",
    severity: "critical",
    date: "Mar 28, 2026",
  },
  {
    id: 3,
    title: "Efficiency improvement",
    description: "Weekend usage reduced by 15%",
    severity: "info",
    date: "Mar 30, 2026",
  },
];

export function WaterManagement() {
  const [timeframe, setTimeframe] = useState("week");

  return (
    <div>
      <PageHeader
        title="Water Management"
        description="Detect abnormal patterns quickly with smart monitoring"
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <div className="text-sm text-gray-600">This Week</div>
            </div>
            <div className="text-2xl font-bold">8,400 L</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-600">12% above target</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-2">Daily Average</div>
            <div className="text-2xl font-bold">1,200 L</div>
            <div className="text-sm text-gray-500 mt-2">Target: 1,000 L/day</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-2">Peak Day</div>
            <div className="text-2xl font-bold text-amber-600">1,600 L</div>
            <div className="text-sm text-gray-500 mt-2">Thursday, Mar 28</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 mb-2">Efficiency</div>
            <div className="text-2xl font-bold text-green-600">82%</div>
            <div className="text-sm text-gray-500 mt-2">vs industry avg</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Usage Trend Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Water Usage Trend</CardTitle>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow-lg">
                          <p className="font-medium mb-2">{data.day}</p>
                          <p className="text-sm text-blue-600">Usage: {data.usage}L</p>
                          <p className="text-sm text-gray-600">Target: {data.target}L</p>
                          <div className="mt-2 pt-2 border-t text-xs space-y-1">
                            <p>Production: {data.breakdown.production}L</p>
                            <p>Cleaning: {data.breakdown.cleaning}L</p>
                            <p>Cooling: {data.breakdown.cooling}L</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Actual Usage"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Alerts & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="p-3 rounded-lg border"
                  style={{
                    backgroundColor: 
                      alert.severity === "critical" ? "#fef2f2" :
                      alert.severity === "warning" ? "#fffbeb" :
                      "#f0f9ff",
                    borderColor:
                      alert.severity === "critical" ? "#fecaca" :
                      alert.severity === "warning" ? "#fde68a" :
                      "#bfdbfe",
                  }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-sm">{alert.title}</p>
                    <Badge 
                      variant="outline"
                      className={
                        alert.severity === "critical" ? "border-red-300 text-red-700" :
                        alert.severity === "warning" ? "border-amber-300 text-amber-700" :
                        "border-blue-300 text-blue-700"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{alert.description}</p>
                  <p className="text-xs text-gray-500">{alert.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Usage by Department</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={departmentUsage} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis type="category" dataKey="department" stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="usage" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {departmentUsage.map((dept) => (
              <div key={dept.department} className="text-center">
                <p className="text-sm text-gray-600">{dept.department}</p>
                <p className="text-xl font-bold">{dept.usage}L</p>
                <p className="text-sm text-gray-500">{dept.percentage}% of total</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
