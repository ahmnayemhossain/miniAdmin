import { PageHeader } from "../components/layout/PageHeader";
import { Leaf, TrendingDown, TrendingUp, Droplets, Trash2, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const esgScoreData = [
  { month: "Oct", environmental: 78, social: 82, governance: 88 },
  { month: "Nov", environmental: 80, social: 83, governance: 89 },
  { month: "Dec", environmental: 82, social: 85, governance: 90 },
  { month: "Jan", environmental: 85, social: 86, governance: 91 },
  { month: "Feb", environmental: 87, social: 88, governance: 92 },
  { month: "Mar", environmental: 89, social: 89, governance: 93 },
];

const waterEfficiencyData = [
  { month: "Oct", usage: 12500, target: 10000 },
  { month: "Nov", usage: 11800, target: 10000 },
  { month: "Dec", usage: 11200, target: 10000 },
  { month: "Jan", usage: 10500, target: 10000 },
  { month: "Feb", usage: 9800, target: 10000 },
  { month: "Mar", usage: 9200, target: 10000 },
];

const wasteReductionData = [
  { category: "Hazardous", baseline: 500, current: 370 },
  { category: "Recyclable", baseline: 800, current: 1020 },
  { category: "General", baseline: 400, current: 280 },
];

export function Sustainability() {
  const waterReduction = ((12500 - 9200) / 12500 * 100).toFixed(1);
  const wasteReduction = ((500 + 400 - 370 - 280) / (500 + 400) * 100).toFixed(1);
  const recyclingIncrease = ((1020 - 800) / 800 * 100).toFixed(1);

  return (
    <div>
      <PageHeader
        title="Sustainability & ESG"
        description="Make impact visible - track environmental performance"
      />

      {/* ESG Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-green-700 mb-1">Environmental</p>
                <p className="text-4xl font-bold text-green-900">89</p>
              </div>
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
            <Progress value={89} className="h-2 bg-green-200" />
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">+11 points this quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-blue-700 mb-1">Social</p>
                <p className="text-4xl font-bold text-blue-900">89</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full text-2xl">
                👥
              </div>
            </div>
            <Progress value={89} className="h-2 bg-blue-200" />
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700">+7 points this quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-purple-700 mb-1">Governance</p>
                <p className="text-4xl font-bold text-purple-900">93</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center bg-purple-600 text-white rounded-full text-2xl">
                ⚖️
              </div>
            </div>
            <Progress value={93} className="h-2 bg-purple-200" />
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-700">+5 points this quarter</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Achievements */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Sustainability Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Droplets className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-blue-900">{waterReduction}%</p>
              <p className="text-sm text-gray-600 mt-2">Water Usage Reduction</p>
              <p className="text-xs text-gray-500 mt-1">vs 6 months ago</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Trash2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-green-900">{wasteReduction}%</p>
              <p className="text-sm text-gray-600 mt-2">Waste Reduction</p>
              <p className="text-xs text-gray-500 mt-1">hazardous + general</p>
            </div>
            <div className="text-center p-6 bg-teal-50 rounded-lg">
              <TrendingUp className="w-12 h-12 text-teal-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-teal-900">{recyclingIncrease}%</p>
              <p className="text-sm text-gray-600 mt-2">Recycling Increase</p>
              <p className="text-xs text-gray-500 mt-1">vs baseline</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* ESG Score Trend */}
        <Card>
          <CardHeader>
            <CardTitle>ESG Score Trend (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={esgScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis domain={[70, 100]} stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="environmental" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Environmental"
                />
                <Line 
                  type="monotone" 
                  dataKey="social" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Social"
                />
                <Line 
                  type="monotone" 
                  dataKey="governance" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Governance"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Water Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle>Water Efficiency Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={waterEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Actual Usage (L)"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target (L)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Waste Reduction Comparison */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Waste Reduction: Baseline vs Current</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={wasteReductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="category" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="baseline" fill="#9ca3af" name="Baseline (kg)" />
              <Bar dataKey="current" fill="#10b981" name="Current (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Droplets className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">Water Conservation</p>
                  <p className="text-sm text-gray-600">3,300L saved monthly</p>
                </div>
              </div>
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Trash2 className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-900">Waste Reduction</p>
                  <p className="text-sm text-gray-600">250kg less waste monthly</p>
                </div>
              </div>
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-teal-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="font-semibold text-gray-900">Energy Efficiency</p>
                  <p className="text-sm text-gray-600">18% reduction in consumption</p>
                </div>
              </div>
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
