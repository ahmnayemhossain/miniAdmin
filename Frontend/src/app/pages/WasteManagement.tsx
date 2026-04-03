import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Plus, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { StatusBadge } from "../components/design-system/StatusBadge";
import { Badge } from "../components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const wasteFlowData = [
  { month: "Oct", hazardous: 420, recyclable: 850, general: 340 },
  { month: "Nov", hazardous: 380, recyclable: 920, general: 310 },
  { month: "Dec", hazardous: 450, recyclable: 780, general: 380 },
  { month: "Jan", hazardous: 390, recyclable: 890, general: 320 },
  { month: "Feb", hazardous: 410, recyclable: 940, general: 300 },
  { month: "Mar", hazardous: 370, recyclable: 1020, general: 280 },
];

interface WasteRecord {
  id: number;
  type: "hazardous" | "recyclable" | "general";
  quantity: number;
  unit: string;
  source: string;
  date: string;
  status: "generated" | "stored" | "disposed";
  disposalMethod?: string;
}

const mockWasteRecords: WasteRecord[] = [
  {
    id: 1,
    type: "hazardous",
    quantity: 45,
    unit: "kg",
    source: "Production Line A",
    date: "Apr 2, 2026",
    status: "stored",
  },
  {
    id: 2,
    type: "recyclable",
    quantity: 120,
    unit: "kg",
    source: "Packaging Dept",
    date: "Apr 2, 2026",
    status: "disposed",
    disposalMethod: "Recycling Center",
  },
  {
    id: 3,
    type: "hazardous",
    quantity: 28,
    unit: "L",
    source: "Lab Section B",
    date: "Apr 1, 2026",
    status: "disposed",
    disposalMethod: "Hazardous Waste Facility",
  },
  {
    id: 4,
    type: "general",
    quantity: 85,
    unit: "kg",
    source: "Office Areas",
    date: "Apr 1, 2026",
    status: "disposed",
    disposalMethod: "Municipal Waste",
  },
  {
    id: 5,
    type: "recyclable",
    quantity: 95,
    unit: "kg",
    source: "Production Line B",
    date: "Mar 31, 2026",
    status: "stored",
  },
];

export function WasteManagement() {
  const handleLogWaste = () => {
    toast.success("Log waste form opened");
  };

  const getWasteTypeColor = (type: string) => {
    switch (type) {
      case "hazardous":
        return "bg-red-100 text-red-800 border-red-200";
      case "recyclable":
        return "bg-green-100 text-green-800 border-green-200";
      case "general":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div>
      <PageHeader
        title="Waste Management"
        description="Track flow, not just data - from generation to disposal"
        action={{
          label: "Log Waste",
          onClick: handleLogWaste,
          icon: Plus,
        }}
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total This Month</div>
            <div className="text-2xl font-bold mt-1">960 kg</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">8% reduction</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Hazardous</div>
            <div className="text-2xl font-bold mt-1 text-red-600">370 kg</div>
            <div className="text-sm text-gray-500 mt-2">38.5% of total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Recyclable</div>
            <div className="text-2xl font-bold mt-1 text-green-600">1,020 kg</div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">12% increase</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">General</div>
            <div className="text-2xl font-bold mt-1">280 kg</div>
            <div className="text-sm text-gray-500 mt-2">29.2% of total</div>
          </CardContent>
        </Card>
      </div>

      {/* Waste Flow Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Waste Generation Trend (6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={wasteFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="hazardous" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Hazardous"
              />
              <Line 
                type="monotone" 
                dataKey="recyclable" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Recyclable"
              />
              <Line 
                type="monotone" 
                dataKey="general" 
                stroke="#6b7280" 
                strokeWidth={2}
                name="General"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Waste Records */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Waste Records</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockWasteRecords.map((record) => (
              <div 
                key={record.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <Badge className={getWasteTypeColor(record.type)}>
                    {record.type}
                  </Badge>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {record.quantity} {record.unit}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{record.source}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {record.date}
                      {record.disposalMethod && (
                        <>
                          <span className="mx-2">•</span>
                          <span>Disposed via: {record.disposalMethod}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <StatusBadge 
                  status={
                    record.status === "generated" ? "warning" :
                    record.status === "stored" ? "info" :
                    "safe"
                  }
                >
                  {record.status}
                </StatusBadge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disposal Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Recycling Center</h3>
            <p className="text-2xl font-bold text-green-600">1,020 kg</p>
            <p className="text-sm text-gray-600 mt-1">58% of total waste</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Hazardous Facility</h3>
            <p className="text-2xl font-bold text-red-600">370 kg</p>
            <p className="text-sm text-gray-600 mt-1">21% of total waste</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-2">Municipal Waste</h3>
            <p className="text-2xl font-bold text-gray-600">280 kg</p>
            <p className="text-sm text-gray-600 mt-1">16% of total waste</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
