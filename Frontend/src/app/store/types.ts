// Shared types used across stores

export type HazardType = "flammable" | "toxic" | "corrosive" | "explosive" | "biohazard" | "environmental";
export type StatusType = "safe" | "warning" | "critical" | "info" | "compliant" | "pending" | "failed";
export type ComplianceStatus = "current" | "expiring" | "expired";

// Certificate Types
export type CertificateType = 
  | "OKEO-TEX-100" 
  | "OKEO-TEX-STeP" 
  | "GOTS" 
  | "GRS" 
  | "BCI" 
  | "BSCI" 
  | "WRAP" 
  | "SA8000" 
  | "ISO-9001" 
  | "ISO-14001" 
  | "ISO-45001"
  | "Higg-Index"
  | "SEDEX"
  | "Other";

export type CertificateStatus = "active" | "expiring-soon" | "expired" | "pending-renewal" | "suspended";
export type AuditType = "internal" | "external" | "surveillance" | "renewal" | "initial";
export type NCRStatus = "open" | "in-progress" | "closed" | "verified";
export type NCRSeverity = "minor" | "major" | "critical";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "operator" | "viewer";
  factory: string;
  avatar?: string;
}

export interface Factory {
  id: string;
  name: string;
  location: string;
  active: boolean;
}

export interface Chemical {
  id: number;
  name: string;
  casNumber: string;
  hazardType: HazardType;
  stockCurrent: number;
  stockMax: number;
  unit: string;
  location: string;
  status: StatusType;
  supplier: string;
  lastUpdated: string;
  description?: string;
}

export interface MSDS {
  id: number;
  chemicalName: string;
  documentNumber: string;
  supplier: string;
  hazardType: HazardType;
  version: string;
  lastUpdated: string;
  status: ComplianceStatus;
  fileSize: string;
  fileUrl?: string;
}

export interface Alert {
  id: number;
  title: string;
  description: string;
  status: StatusType;
  priority: "low" | "medium" | "high" | "critical";
  category: "stock" | "compliance" | "safety" | "maintenance" | "system" | "certificate";
  timestamp: string;
  acknowledged: boolean;
  assignedTo?: string;
}

export interface Certificate {
  id: string;
  certificateType: CertificateType;
  certificateNumber: string;
  certificateName: string;
  issuedBy: string;
  issueDate: string;
  expiryDate: string;
  status: CertificateStatus;
  scope: string;
  factory: string;
  factoryId: string;
  attachments: CertificateAttachment[];
  renewalHistory: RenewalRecord[];
  daysUntilExpiry?: number;
  nextAuditDate?: string;
  auditor?: string;
  score?: number;
}

export interface CertificateAttachment {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadDate: string;
  uploadedBy: string;
}

export interface RenewalRecord {
  id: string;
  renewalDate: string;
  previousExpiryDate: string;
  newExpiryDate: string;
  renewedBy: string;
  cost?: number;
  notes?: string;
}

export interface AuditRecord {
  id: string;
  certificateId?: string;
  auditType: AuditType;
  auditDate: string;
  auditor: string;
  auditingBody: string;
  score: number;
  maxScore: number;
  status: "passed" | "passed-with-observations" | "failed";
  findings: string[];
  ncrCount: number;
  reportUrl?: string;
  nextAuditDate?: string;
  factory: string;
}

export interface NCR {
  id: string;
  ncrNumber: string;
  auditId?: string;
  certificateId?: string;
  title: string;
  description: string;
  severity: NCRSeverity;
  status: NCRStatus;
  raisedBy: string;
  raisedDate: string;
  assignedTo: string;
  dueDate: string;
  closedDate?: string;
  rootCause?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  verificationDate?: string;
  verifiedBy?: string;
  attachments: string[];
  factory: string;
}

export interface SupplierCertificate {
  id: string;
  supplierId: string;
  supplierName: string;
  certificateType: CertificateType;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  status: CertificateStatus;
  verifiedBy: string;
  verificationDate: string;
  attachments: CertificateAttachment[];
}

export interface WasteRecord {
  id: number;
  type: string;
  quantity: number;
  unit: string;
  hazardLevel: HazardType;
  disposalMethod: string;
  date: string;
  status: "pending" | "in-progress" | "completed";
  handler: string;
  cost?: number;
}

export interface WaterUsage {
  id: number;
  date: string;
  usage: number;
  source: string;
  department: string;
  cost: number;
}

export interface ComplianceRecord {
  id: number;
  title: string;
  type: "audit" | "inspection" | "certification" | "report";
  status: ComplianceStatus;
  dueDate: string;
  completedDate?: string;
  responsible: string;
  score?: number;
}

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  location: string;
  supplier: string;
  lastRestocked: string;
  cost: number;
}

export interface AppSettings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  alerts: {
    lowStock: boolean;
    complianceDue: boolean;
    safetyIncidents: boolean;
  };
  display: {
    language: string;
    timezone: string;
    dateFormat: string;
  };
}