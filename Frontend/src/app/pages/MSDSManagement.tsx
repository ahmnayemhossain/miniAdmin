import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Plus, Search, Filter, Download, Eye, FileText, Upload, X, Grid3x3, List } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { StatusBadge } from "../components/design-system/StatusBadge";
import { HazardIcon } from "../components/design-system/HazardIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import { useDateFilterStore } from "../store";
import { DateFilter } from "../components/DateFilter";

interface MSDS {
  id: number;
  chemicalName: string;
  documentNumber: string;
  supplier: string;
  hazardType: "flammable" | "toxic" | "corrosive" | "explosive";
  version: string;
  lastUpdated: string;
  status: "current" | "expiring" | "expired";
  fileSize: string;
}

const mockMSDS: MSDS[] = [
  {
    id: 1,
    chemicalName: "Sulfuric Acid",
    documentNumber: "MSDS-2024-001",
    supplier: "ChemCorp Industries",
    hazardType: "corrosive",
    version: "3.2",
    lastUpdated: "Jan 15, 2024",
    status: "current",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    chemicalName: "Ethanol",
    documentNumber: "MSDS-2024-002",
    supplier: "Solvent Solutions",
    hazardType: "flammable",
    version: "2.1",
    lastUpdated: "Feb 3, 2024",
    status: "current",
    fileSize: "1.8 MB",
  },
  {
    id: 3,
    chemicalName: "Hydrochloric Acid",
    documentNumber: "MSDS-2023-045",
    supplier: "ChemCorp Industries",
    hazardType: "corrosive",
    version: "4.0",
    lastUpdated: "Nov 20, 2023",
    status: "expiring",
    fileSize: "2.1 MB",
  },
  {
    id: 4,
    chemicalName: "Sodium Hydroxide",
    documentNumber: "MSDS-2024-003",
    supplier: "Basic Chemicals Ltd",
    hazardType: "corrosive",
    version: "1.5",
    lastUpdated: "Mar 8, 2024",
    status: "current",
    fileSize: "1.9 MB",
  },
  {
    id: 5,
    chemicalName: "Acetone",
    documentNumber: "MSDS-2023-012",
    supplier: "Solvent Solutions",
    hazardType: "flammable",
    version: "3.0",
    lastUpdated: "Aug 5, 2023",
    status: "expired",
    fileSize: "2.2 MB",
  },
];

export function MSDSManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hazardFilter, setHazardFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Use global date filter
  const { dateRange } = useDateFilterStore();
  
  // Form state
  const [formData, setFormData] = useState({
    chemicalName: "",
    supplier: "",
    hazardType: "flammable" as const,
    version: "",
    documentNumber: "",
  });

  const filteredMSDS = mockMSDS.filter((msds) => {
    const matchesSearch =
      msds.chemicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msds.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msds.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesHazard = hazardFilter === "all" || msds.hazardType === hazardFilter;
    const matchesStatus = statusFilter === "all" || msds.status === statusFilter;
    
    return matchesSearch && matchesHazard && matchesStatus;
  });

  const handleUploadMSDS = () => {
    setUploadDialogOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      
      setSelectedFile(file);
      toast.success(`File selected: ${file.name}`);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    if (!formData.chemicalName || !formData.supplier || !formData.version || !formData.documentNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      toast.success(`MSDS uploaded successfully: ${formData.chemicalName}`);
      
      // Reset form
      setUploadDialogOpen(false);
      setSelectedFile(null);
      setUploading(false);
      setUploadProgress(0);
      setFormData({
        chemicalName: "",
        supplier: "",
        hazardType: "flammable",
        version: "",
        documentNumber: "",
      });
    }, 2000);
  };

  const handlePreview = (msds: MSDS) => {
    toast.info(`Previewing ${msds.chemicalName} MSDS`);
  };

  const handleDownload = (msds: MSDS) => {
    toast.success(`Downloading ${msds.chemicalName} MSDS`);
  };

  return (
    <div>
      <PageHeader
        title="MSDS Management"
        description="Search, don't browse - powerful MSDS document management"
        action={{
          label: "Upload MSDS",
          onClick: handleUploadMSDS,
          icon: Plus,
        }}
      >
        {/* Filters */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by chemical name, document number, or supplier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={hazardFilter} onValueChange={setHazardFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Hazard Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Hazards</SelectItem>
              <SelectItem value="flammable">Flammable</SelectItem>
              <SelectItem value="toxic">Toxic</SelectItem>
              <SelectItem value="corrosive">Corrosive</SelectItem>
              <SelectItem value="explosive">Explosive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="current">Current</SelectItem>
              <SelectItem value="expiring">Expiring Soon</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PageHeader>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Documents</div>
            <div className="text-2xl font-bold mt-1 text-foreground">328</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Current</div>
            <div className="text-2xl font-bold mt-1 text-green-600">298</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Expiring Soon</div>
            <div className="text-2xl font-bold mt-1 text-amber-600">18</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">Expired</div>
            <div className="text-2xl font-bold mt-1 text-red-600">12</div>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle and Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredMSDS.length} of {mockMSDS.length} documents
        </p>
        
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "grid" | "list")}>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid3x3 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMSDS.map((msds) => (
            <Card key={msds.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <FileText className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </div>
                    <HazardIcon type={msds.hazardType} size="md" />
                  </div>
                  <StatusBadge 
                    status={
                      msds.status === "current" ? "safe" : 
                      msds.status === "expiring" ? "warning" : 
                      "critical"
                    }
                  >
                    {msds.status}
                  </StatusBadge>
                </div>

                <h3 className="font-semibold text-lg mb-2 text-foreground">{msds.chemicalName}</h3>
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex justify-between">
                    <span>Doc Number:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{msds.documentNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Supplier:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{msds.supplier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Version:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{msds.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{msds.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{msds.fileSize}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => handlePreview(msds)}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={() => handleDownload(msds)}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Chemical Name</TableHead>
                  <TableHead>Document Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Hazard</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMSDS.map((msds) => (
                  <TableRow key={msds.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        {msds.chemicalName}
                      </div>
                    </TableCell>
                    <TableCell>{msds.documentNumber}</TableCell>
                    <TableCell>{msds.supplier}</TableCell>
                    <TableCell>
                      <HazardIcon type={msds.hazardType} size="sm" />
                    </TableCell>
                    <TableCell>{msds.version}</TableCell>
                    <TableCell>{msds.lastUpdated}</TableCell>
                    <TableCell>
                      <StatusBadge 
                        status={
                          msds.status === "current" ? "safe" : 
                          msds.status === "expiring" ? "warning" : 
                          "critical"
                        }
                      >
                        {msds.status}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handlePreview(msds)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDownload(msds)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {filteredMSDS.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No MSDS documents found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button onClick={handleUploadMSDS}>
              <Plus className="w-4 h-4 mr-2" />
              Upload MSDS
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload MSDS Document</DialogTitle>
            <DialogDescription>
              Upload a new MSDS document for your chemical inventory.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="chemicalName">Chemical Name</Label>
              <Input
                id="chemicalName"
                value={formData.chemicalName}
                onChange={(e) => setFormData({ ...formData, chemicalName: e.target.value })}
                placeholder="Enter chemical name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                placeholder="Enter supplier name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hazardType">Hazard Type</Label>
              <Select
                value={formData.hazardType}
                onValueChange={(value) => setFormData({ ...formData, hazardType: value as "flammable" | "toxic" | "corrosive" | "explosive" })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select hazard type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flammable">Flammable</SelectItem>
                  <SelectItem value="toxic">Toxic</SelectItem>
                  <SelectItem value="corrosive">Corrosive</SelectItem>
                  <SelectItem value="explosive">Explosive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="Enter version number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentNumber">Document Number</Label>
              <Input
                id="documentNumber"
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                placeholder="Enter document number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Upload File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file')?.click()}
                >
                  <Upload className="w-4 h-4" />
                  {selectedFile ? selectedFile.name : "Select file"}
                </Button>
                {selectedFile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveFile}
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>

            {uploading && (
              <div className="space-y-2">
                <Label>Upload Progress</Label>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setUploadDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUploadSubmit}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}