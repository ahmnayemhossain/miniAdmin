import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Plus, Award, Calendar, FileText, AlertTriangle, BarChart3, Search, Filter, Grid3x3, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { useCertificateStore } from "../store";
import { CertificateCard } from "../components/compliance/CertificateCard";
import { ComplianceCalendar } from "../components/compliance/ComplianceCalendar";
import type { Certificate, CertificateType } from "../store/types";

export function ComplianceAudit() {
  const { 
    certificates, 
    audits, 
    ncrs,
    getExpiringCertificates,
    getExpiredCertificates,
    getOpenNCRs,
    addCertificate 
  } = useCertificateStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [addCertDialogOpen, setAddCertDialogOpen] = useState(false);
  
  // New certificate form
  const [newCert, setNewCert] = useState({
    certificateType: "OKEO-TEX-100" as CertificateType,
    certificateNumber: "",
    certificateName: "",
    issuedBy: "",
    issueDate: "",
    expiryDate: "",
    scope: "",
  });

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = 
      cert.certificateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || cert.status === statusFilter;
    const matchesType = typeFilter === "all" || cert.certificateType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Statistics
  const stats = {
    total: certificates.length,
    active: certificates.filter(c => c.status === 'active').length,
    expiringSoon: getExpiringCertificates(30).length,
    expired: getExpiredCertificates().length,
    openNCRs: getOpenNCRs().length,
  };

  const handleAddCertificate = () => {
    if (!newCert.certificateNumber || !newCert.certificateName || !newCert.issueDate || !newCert.expiryDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const certificate: Certificate = {
      id: `cert-${Date.now()}`,
      ...newCert,
      factory: "Plant A",
      factoryId: "1",
      status: "active",
      attachments: [],
      renewalHistory: [],
    };

    addCertificate(certificate);
    toast.success(`Certificate ${newCert.certificateNumber} added successfully`);
    setAddCertDialogOpen(false);
    setNewCert({
      certificateType: "OKEO-TEX-100",
      certificateNumber: "",
      certificateName: "",
      issuedBy: "",
      issueDate: "",
      expiryDate: "",
      scope: "",
    });
  };

  const handleViewCertificate = (cert: Certificate) => {
    toast.info(`Viewing certificate: ${cert.certificateName}`);
  };

  const handleRenewCertificate = (cert: Certificate) => {
    toast.info(`Starting renewal process for: ${cert.certificateName}`);
  };

  const certificateTypeLabels: Record<CertificateType, string> = {
    "OKEO-TEX-100": "OEKO-TEX Standard 100",
    "OKEO-TEX-STeP": "OEKO-TEX STeP",
    "GOTS": "Global Organic Textile Standard",
    "GRS": "Global Recycled Standard",
    "BCI": "Better Cotton Initiative",
    "BSCI": "Business Social Compliance Initiative",
    "WRAP": "Worldwide Responsible Accredited Production",
    "SA8000": "SA8000 Social Accountability",
    "ISO-9001": "ISO 9001:2015",
    "ISO-14001": "ISO 14001:2015",
    "ISO-45001": "ISO 45001:2018",
    "Higg-Index": "Higg Index",
    "SEDEX": "SEDEX",
    "Other": "Other",
  };

  return (
    <div>
      <PageHeader
        title="Compliance & Certifications"
        description="Manage factory certifications, audits, and compliance records"
        action={{
          label: "Add Certificate",
          onClick: () => setAddCertDialogOpen(true),
          icon: Plus,
        }}
      >
        {/* Search and Filters */}
        <div className="flex items-center gap-4 mt-4 flex-wrap">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Certificate Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="OKEO-TEX-100">OEKO-TEX 100</SelectItem>
              <SelectItem value="OKEO-TEX-STeP">OEKO-TEX STeP</SelectItem>
              <SelectItem value="GOTS">GOTS</SelectItem>
              <SelectItem value="GRS">GRS</SelectItem>
              <SelectItem value="BSCI">BSCI</SelectItem>
              <SelectItem value="ISO-9001">ISO 9001</SelectItem>
              <SelectItem value="ISO-14001">ISO 14001</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="pending-renewal">Pending Renewal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PageHeader>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total Certificates</div>
                <div className="text-2xl font-bold text-foreground mt-1">{stats.total}</div>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Active</div>
                <div className="text-2xl font-bold text-green-600 mt-1">{stats.active}</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <span className="text-green-600 text-xl">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Expiring Soon</div>
                <div className="text-2xl font-bold text-amber-600 mt-1">{stats.expiringSoon}</div>
              </div>
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Expired</div>
                <div className="text-2xl font-bold text-red-600 mt-1">{stats.expired}</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <span className="text-red-600 text-xl">!</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Open NCRs</div>
                <div className="text-2xl font-bold text-blue-600 mt-1">{stats.openNCRs}</div>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="certificates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="audits">Audit History</TabsTrigger>
          <TabsTrigger value="ncrs">NCRs</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredCertificates.length} of {certificates.length} certificates
            </p>
            
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => {
              if (value) setViewMode(value as "grid" | "list");
            }}>
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
              {filteredCertificates.map((cert) => (
                <CertificateCard
                  key={cert.id}
                  certificate={cert}
                  onView={handleViewCertificate}
                  onRenew={handleRenewCertificate}
                />
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
                      <TableHead>Certificate</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Certificate Number</TableHead>
                      <TableHead>Issued By</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCertificates.map((cert) => (
                      <TableRow key={cert.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-600" />
                            {cert.certificateName}
                          </div>
                        </TableCell>
                        <TableCell>{cert.certificateType}</TableCell>
                        <TableCell>{cert.certificateNumber}</TableCell>
                        <TableCell>{cert.issuedBy}</TableCell>
                        <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(cert.expiryDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={
                            cert.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            cert.status === 'expiring-soon' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }>
                            {cert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleViewCertificate(cert)}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {filteredCertificates.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No certificates found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
                <Button onClick={() => setAddCertDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certificate
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Audits Tab */}
        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Audit Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Auditor</TableHead>
                    <TableHead>Auditing Body</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>NCRs</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell>{new Date(audit.auditDate).toLocaleDateString()}</TableCell>
                      <TableCell className="capitalize">{audit.auditType}</TableCell>
                      <TableCell>{audit.auditor}</TableCell>
                      <TableCell>{audit.auditingBody}</TableCell>
                      <TableCell>
                        <span className="font-medium">{audit.score}/{audit.maxScore}</span>
                      </TableCell>
                      <TableCell>
                        {audit.ncrCount > 0 ? (
                          <Badge variant="secondary">{audit.ncrCount}</Badge>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          audit.status === 'passed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          audit.status === 'passed-with-observations' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }>
                          {audit.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* NCRs Tab */}
        <TabsContent value="ncrs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Non-Conformance Reports (NCRs)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NCR Number</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ncrs.map((ncr) => (
                    <TableRow key={ncr.id}>
                      <TableCell className="font-medium">{ncr.ncrNumber}</TableCell>
                      <TableCell>{ncr.title}</TableCell>
                      <TableCell>
                        <Badge className={
                          ncr.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          ncr.severity === 'major' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }>
                          {ncr.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          ncr.status === 'closed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          ncr.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                        }>
                          {ncr.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{ncr.assignedTo}</TableCell>
                      <TableCell>{new Date(ncr.dueDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComplianceCalendar 
              certificates={certificates}
              onCertificateClick={handleViewCertificate}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Renewals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getExpiringCertificates(90).map((cert) => (
                    <div key={cert.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{cert.certificateName}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{cert.certificateNumber}</p>
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                            </span>
                            <Badge variant="secondary" className="ml-2">
                              {cert.daysUntilExpiry} days
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => handleRenewCertificate(cert)}>
                          Renew
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {getExpiringCertificates(90).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>No certificates expiring in the next 90 days</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Certificate Dialog */}
      <Dialog open={addCertDialogOpen} onOpenChange={setAddCertDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Certificate</DialogTitle>
            <DialogDescription>
              Add a new compliance certificate to your factory records
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Certificate Type</Label>
                <Select
                  value={newCert.certificateType}
                  onValueChange={(value) => setNewCert({ ...newCert, certificateType: value as CertificateType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(certificateTypeLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Certificate Number</Label>
                <Input
                  value={newCert.certificateNumber}
                  onChange={(e) => setNewCert({ ...newCert, certificateNumber: e.target.value })}
                  placeholder="e.g., OTX-2024-001234"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Certificate Name</Label>
              <Input
                value={newCert.certificateName}
                onChange={(e) => setNewCert({ ...newCert, certificateName: e.target.value })}
                placeholder="e.g., OEKO-TEX Standard 100"
              />
            </div>

            <div className="space-y-2">
              <Label>Issued By</Label>
              <Input
                value={newCert.issuedBy}
                onChange={(e) => setNewCert({ ...newCert, issuedBy: e.target.value })}
                placeholder="e.g., OEKO-TEX Association"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Issue Date</Label>
                <Input
                  type="date"
                  value={newCert.issueDate}
                  onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  value={newCert.expiryDate}
                  onChange={(e) => setNewCert({ ...newCert, expiryDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Scope</Label>
              <Textarea
                value={newCert.scope}
                onChange={(e) => setNewCert({ ...newCert, scope: e.target.value })}
                placeholder="e.g., All textile products - Class I (Baby)"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCertDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCertificate}>
              Add Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}