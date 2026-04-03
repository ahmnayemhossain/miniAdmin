import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Plus, Search, Filter, Package, AlertTriangle } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { StatusBadge } from "../components/design-system/StatusBadge";
import { StockIndicator } from "../components/design-system/StockIndicator";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  sku: string;
  stockCurrent: number;
  stockMax: number;
  stockMin: number;
  unit: string;
  location: string;
  lastRestocked: string;
  status: "ok" | "low" | "critical";
}

const mockInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Sulfuric Acid 98%",
    category: "Chemicals",
    sku: "CHEM-SA-001",
    stockCurrent: 150,
    stockMax: 500,
    stockMin: 100,
    unit: "L",
    location: "Storage A-12",
    lastRestocked: "Mar 28, 2026",
    status: "low",
  },
  {
    id: 2,
    name: "Safety Goggles",
    category: "PPE",
    sku: "PPE-SG-045",
    stockCurrent: 45,
    stockMax: 100,
    stockMin: 20,
    unit: "units",
    location: "Safety Storage",
    lastRestocked: "Apr 1, 2026",
    status: "ok",
  },
  {
    id: 3,
    name: "Hydrochloric Acid 37%",
    category: "Chemicals",
    sku: "CHEM-HCL-002",
    stockCurrent: 35,
    stockMax: 300,
    stockMin: 50,
    unit: "L",
    location: "Storage A-14",
    lastRestocked: "Mar 15, 2026",
    status: "critical",
  },
  {
    id: 4,
    name: "Nitrile Gloves",
    category: "PPE",
    sku: "PPE-NG-120",
    stockCurrent: 850,
    stockMax: 1000,
    stockMin: 200,
    unit: "pairs",
    location: "Safety Storage",
    lastRestocked: "Apr 2, 2026",
    status: "ok",
  },
  {
    id: 5,
    name: "Lab Coats",
    category: "PPE",
    sku: "PPE-LC-035",
    stockCurrent: 18,
    stockMax: 50,
    stockMin: 15,
    unit: "units",
    location: "Safety Storage",
    lastRestocked: "Feb 20, 2026",
    status: "low",
  },
  {
    id: 6,
    name: "Sodium Hydroxide Pellets",
    category: "Chemicals",
    sku: "CHEM-SH-003",
    stockCurrent: 220,
    stockMax: 400,
    stockMin: 80,
    unit: "kg",
    location: "Storage C-02",
    lastRestocked: "Mar 25, 2026",
    status: "ok",
  },
];

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredInventory = mockInventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    toast.success("Add inventory item form opened");
  };

  const handleQuickRestock = (item: InventoryItem) => {
    toast.success(`Quick restock for ${item.name}`);
  };

  const okCount = mockInventory.filter(item => item.status === "ok").length;
  const lowCount = mockInventory.filter(item => item.status === "low").length;
  const criticalCount = mockInventory.filter(item => item.status === "critical").length;

  return (
    <div>
      <PageHeader
        title="Inventory Management"
        description="Operational clarity at a glance"
        action={{
          label: "Add Item",
          onClick: handleAddItem,
          icon: Plus,
        }}
      >
        {/* Filters */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              variant={categoryFilter === "all" ? "default" : "outline"}
              onClick={() => setCategoryFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button 
              variant={categoryFilter === "Chemicals" ? "default" : "outline"}
              onClick={() => setCategoryFilter("Chemicals")}
              size="sm"
            >
              Chemicals
            </Button>
            <Button 
              variant={categoryFilter === "PPE" ? "default" : "outline"}
              onClick={() => setCategoryFilter("PPE")}
              size="sm"
            >
              PPE
            </Button>
          </div>
        </div>
      </PageHeader>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600">Total Items</div>
                <div className="text-2xl font-bold">{mockInventory.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div>
                <div className="text-sm text-gray-600">Normal Stock</div>
                <div className="text-2xl font-bold text-green-600">{okCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              <div>
                <div className="text-sm text-gray-600">Low Stock</div>
                <div className="text-2xl font-bold text-amber-600">{lowCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-sm text-gray-600">Critical</div>
                <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Details</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Restocked</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-48">
                      <StockIndicator
                        current={item.stockCurrent}
                        max={item.stockMax}
                        unit={item.unit}
                        showLabel={false}
                      />
                      <div className="text-xs text-gray-600 mt-1 flex justify-between">
                        <span>{item.stockCurrent} {item.unit}</span>
                        <span className="text-gray-400">Min: {item.stockMin}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-700">{item.location}</span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge 
                      status={
                        item.status === "ok" ? "safe" :
                        item.status === "low" ? "warning" :
                        "critical"
                      }
                    >
                      {item.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {item.lastRestocked}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant={item.status === "critical" ? "default" : "outline"}
                      onClick={() => handleQuickRestock(item)}
                    >
                      Restock
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Low Stock Alert */}
      {(lowCount > 0 || criticalCount > 0) && (
        <Card className="mt-6 border-amber-300 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-amber-900">Stock Attention Required</h4>
                <p className="text-sm text-amber-800 mt-1">
                  {criticalCount > 0 && `${criticalCount} item(s) critically low. `}
                  {lowCount > 0 && `${lowCount} item(s) below recommended level.`}
                  {" "}Consider restocking soon to avoid operational disruption.
                </p>
              </div>
              <Button size="sm" variant="outline">View All</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
