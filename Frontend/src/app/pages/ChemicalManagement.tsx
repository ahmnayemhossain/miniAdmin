import { PageHeader } from "../components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Plus, Search, Filter, FileText, AlertTriangle, MoreVertical, Eye } from "lucide-react";
import { useState } from "react";
import { useChemicalStore } from "../store";
import { useDateFilterStore } from "../store";
import { DateFilter } from "../components/DateFilter";
import { HazardIcon } from "../components/design-system/HazardIcon";
import { StockIndicator } from "../components/design-system/StockIndicator";
import { StatusBadge } from "../components/design-system/StatusBadge";
import { AddChemicalDialog } from "../components/AddChemicalDialog";
import { toast } from "sonner";

export function ChemicalManagement() {
  const [selectedChemical, setSelectedChemical] = useState<number | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Use global state
  const { 
    filteredChemicals, 
    searchQuery, 
    filterStatus,
    setSearchQuery, 
    setFilterStatus,
    getChemicalById 
  } = useChemicalStore();

  // Use global date filter
  const { dateRange } = useDateFilterStore();

  const chemical = selectedChemical ? getChemicalById(selectedChemical) : null;

  const handleViewDetails = (chemicalId: number) => {
    setSelectedChemical(chemicalId);
  };

  const handleAddChemical = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddStock = (chemicalId: number) => {
    const chemical = getChemicalById(chemicalId);
    if (chemical) {
      toast.success(`Add stock for ${chemical.name}`);
    }
  };

  const handleReportUsage = (chemicalId: number) => {
    const chemical = getChemicalById(chemicalId);
    if (chemical) {
      toast.success(`Report usage for ${chemical.name}`);
    }
  };

  return (
    <div>
      <PageHeader
        title="Chemical Management"
        description="Everything about a chemical in one place"
        action={{
          label: "Add Chemical",
          onClick: handleAddChemical,
          icon: Plus,
        }}
      >
        {/* Filters */}
        <div className="flex items-center justify-between gap-4 mt-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or CAS number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
          <DateFilter />
        </div>
      </PageHeader>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total Chemicals</div>
            <div className="text-2xl font-bold mt-1">247</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Low Stock</div>
            <div className="text-2xl font-bold mt-1 text-amber-600">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Critical</div>
            <div className="text-2xl font-bold mt-1 text-red-600">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Locations</div>
            <div className="text-2xl font-bold mt-1">18</div>
          </CardContent>
        </Card>
      </div>

      {/* Chemicals Table */}
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chemical</TableHead>
                <TableHead>Hazard</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChemicals.map((chemical) => (
                <TableRow key={chemical.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{chemical.name}</div>
                      <div className="text-sm text-gray-500">CAS: {chemical.casNumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <HazardIcon type={chemical.hazardType} />
                  </TableCell>
                  <TableCell>
                    <div className="w-40">
                      <StockIndicator
                        current={chemical.stockCurrent}
                        max={chemical.stockMax}
                        unit={chemical.unit}
                        showLabel={false}
                      />
                      <div className="text-xs text-gray-600 mt-1">
                        {chemical.stockCurrent} / {chemical.stockMax} {chemical.unit}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{chemical.location}</Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={chemical.status}>
                      {chemical.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {chemical.lastUpdated}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(chemical.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAddStock(chemical.id)}>
                          Add Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReportUsage(chemical.id)}>
                          Report Usage
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Panel */}
      <Sheet open={selectedChemical !== null} onOpenChange={(open) => !open && setSelectedChemical(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {chemical && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <HazardIcon type={chemical.hazardType} size="lg" />
                  {chemical.name}
                </SheetTitle>
              </SheetHeader>

              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="msds">MSDS</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="safety">Safety</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600">CAS Number</label>
                      <p className="font-medium">{chemical.casNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Supplier</label>
                      <p className="font-medium">{chemical.supplier}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Location</label>
                      <p className="font-medium">{chemical.location}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Stock Status</label>
                      <StockIndicator
                        current={chemical.stockCurrent}
                        max={chemical.stockMax}
                        unit={chemical.unit}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Hazard Type</label>
                      <div className="flex items-center gap-2 mt-1">
                        <HazardIcon type={chemical.hazardType} />
                        <span className="capitalize">{chemical.hazardType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={() => handleAddStock(chemical.id)} className="flex-1">
                      Add Stock
                    </Button>
                    <Button variant="outline" onClick={() => handleReportUsage(chemical.id)} className="flex-1">
                      Report Usage
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="msds" className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-600">MSDS Document</p>
                      <Button variant="link" className="p-0 h-auto">
                        View Safety Data Sheet
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium">Stock Added</p>
                      <p className="text-xs text-gray-600">+50L • 2 days ago</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium">Usage Reported</p>
                      <p className="text-xs text-gray-600">-25L • 5 days ago</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium">Stock Added</p>
                      <p className="text-xs text-gray-600">+100L • 1 week ago</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="safety" className="space-y-4">
                  <Card className="border-amber-200 bg-amber-50">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-amber-900">Safety Precautions</p>
                      <ul className="text-sm text-amber-800 mt-2 space-y-1 list-disc list-inside">
                        <li>Wear protective equipment</li>
                        <li>Store in ventilated area</li>
                        <li>Keep away from heat sources</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Chemical Dialog */}
      <AddChemicalDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
}