import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Certificate, AuditRecord, NCR, SupplierCertificate } from './types';

interface CertificateState {
  certificates: Certificate[];
  audits: AuditRecord[];
  ncrs: NCR[];
  supplierCertificates: SupplierCertificate[];
  
  // Actions - Certificates
  addCertificate: (certificate: Certificate) => void;
  updateCertificate: (id: string, updates: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;
  getCertificateById: (id: string) => Certificate | undefined;
  getExpiringCertificates: (days: number) => Certificate[];
  getExpiredCertificates: () => Certificate[];
  
  // Actions - Audits
  addAudit: (audit: AuditRecord) => void;
  updateAudit: (id: string, updates: Partial<AuditRecord>) => void;
  getAuditsByCertificate: (certificateId: string) => AuditRecord[];
  
  // Actions - NCRs
  addNCR: (ncr: NCR) => void;
  updateNCR: (id: string, updates: Partial<NCR>) => void;
  getOpenNCRs: () => NCR[];
  getNCRsByAudit: (auditId: string) => NCR[];
  
  // Actions - Supplier Certificates
  addSupplierCertificate: (cert: SupplierCertificate) => void;
  updateSupplierCertificate: (id: string, updates: Partial<SupplierCertificate>) => void;
  getSupplierCertificates: (supplierId: string) => SupplierCertificate[];
}

// Calculate days until expiry
const calculateDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Calculate status based on days until expiry
const calculateStatus = (daysUntilExpiry: number): Certificate['status'] => {
  if (daysUntilExpiry < 0) return 'expired';
  if (daysUntilExpiry <= 30) return 'expiring-soon';
  return 'active';
};

// Mock certificates data
const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    certificateType: 'OKEO-TEX-100',
    certificateNumber: 'OTX-2024-001234',
    certificateName: 'OEKO-TEX Standard 100',
    issuedBy: 'OEKO-TEX Association',
    issueDate: '2024-01-15',
    expiryDate: '2025-01-14',
    status: 'active',
    scope: 'All textile products - Class I (Baby)',
    factory: 'Plant A',
    factoryId: '1',
    attachments: [
      {
        id: 'att-1',
        fileName: 'OEKO-TEX-Certificate-2024.pdf',
        fileSize: '2.4 MB',
        fileType: 'application/pdf',
        uploadDate: '2024-01-15',
        uploadedBy: 'John Doe',
      }
    ],
    renewalHistory: [],
    daysUntilExpiry: 286,
    nextAuditDate: '2024-12-15',
    auditor: 'TESTEX AG',
    score: 98,
  },
  {
    id: 'cert-2',
    certificateType: 'GOTS',
    certificateNumber: 'GOTS-2023-789456',
    certificateName: 'Global Organic Textile Standard',
    issuedBy: 'Control Union',
    issueDate: '2023-03-20',
    expiryDate: '2024-03-19',
    status: 'expired',
    scope: 'Organic Cotton Processing',
    factory: 'Plant A',
    factoryId: '1',
    attachments: [],
    renewalHistory: [],
    daysUntilExpiry: -15,
    nextAuditDate: '2024-02-20',
    auditor: 'Control Union India',
  },
  {
    id: 'cert-3',
    certificateType: 'ISO-9001',
    certificateNumber: 'ISO-9001-2024-567',
    certificateName: 'ISO 9001:2015 Quality Management',
    issuedBy: 'BSI Group',
    issueDate: '2023-06-10',
    expiryDate: '2026-06-09',
    status: 'active',
    scope: 'Manufacturing of textile products',
    factory: 'Plant A',
    factoryId: '1',
    attachments: [],
    renewalHistory: [],
    daysUntilExpiry: 798,
    nextAuditDate: '2024-06-10',
    auditor: 'BSI',
    score: 92,
  },
  {
    id: 'cert-4',
    certificateType: 'BSCI',
    certificateNumber: 'BSCI-2024-998877',
    certificateName: 'Business Social Compliance Initiative',
    issuedBy: 'amfori',
    issueDate: '2023-09-05',
    expiryDate: '2024-09-04',
    status: 'expiring-soon',
    scope: 'Social compliance for all operations',
    factory: 'Plant A',
    factoryId: '1',
    attachments: [],
    renewalHistory: [],
    daysUntilExpiry: 154,
    nextAuditDate: '2024-07-05',
    auditor: 'SGS',
    score: 88,
  },
  {
    id: 'cert-5',
    certificateType: 'GRS',
    certificateNumber: 'GRS-2024-445566',
    certificateName: 'Global Recycled Standard',
    issuedBy: 'Control Union',
    issueDate: '2024-02-01',
    expiryDate: '2025-01-31',
    status: 'active',
    scope: 'Recycled polyester processing',
    factory: 'Plant B',
    factoryId: '2',
    attachments: [],
    renewalHistory: [],
    daysUntilExpiry: 303,
    nextAuditDate: '2024-12-01',
    auditor: 'Control Union',
  },
];

// Mock audits
const mockAudits: AuditRecord[] = [
  {
    id: 'audit-1',
    certificateId: 'cert-1',
    auditType: 'surveillance',
    auditDate: '2024-01-15',
    auditor: 'Michael Schmidt',
    auditingBody: 'TESTEX AG',
    score: 98,
    maxScore: 100,
    status: 'passed',
    findings: [
      'Excellent documentation system',
      'Strong chemical management procedures',
      'Minor observation: Update one lab report'
    ],
    ncrCount: 0,
    nextAuditDate: '2024-12-15',
    factory: 'Plant A',
  },
  {
    id: 'audit-2',
    certificateId: 'cert-4',
    auditType: 'external',
    auditDate: '2023-09-05',
    auditor: 'Sarah Johnson',
    auditingBody: 'SGS',
    score: 88,
    maxScore: 100,
    status: 'passed-with-observations',
    findings: [
      'Worker training records need improvement',
      'Fire safety equipment needs inspection',
      'Good overall compliance'
    ],
    ncrCount: 2,
    nextAuditDate: '2024-07-05',
    factory: 'Plant A',
  },
];

// Mock NCRs
const mockNCRs: NCR[] = [
  {
    id: 'ncr-1',
    ncrNumber: 'NCR-2024-001',
    auditId: 'audit-2',
    certificateId: 'cert-4',
    title: 'Incomplete worker training records',
    description: 'Training records for 5 workers are incomplete or missing signatures',
    severity: 'minor',
    status: 'in-progress',
    raisedBy: 'Sarah Johnson - SGS',
    raisedDate: '2023-09-05',
    assignedTo: 'HR Manager',
    dueDate: '2024-04-30',
    rootCause: 'Manual tracking system prone to errors',
    correctiveAction: 'Implementing digital training tracking system',
    factory: 'Plant A',
    attachments: [],
  },
  {
    id: 'ncr-2',
    ncrNumber: 'NCR-2024-002',
    auditId: 'audit-2',
    certificateId: 'cert-4',
    title: 'Fire extinguisher inspection overdue',
    description: '3 fire extinguishers have not been inspected in the last 6 months',
    severity: 'major',
    status: 'closed',
    raisedBy: 'Sarah Johnson - SGS',
    raisedDate: '2023-09-05',
    assignedTo: 'Safety Officer',
    dueDate: '2023-10-05',
    closedDate: '2023-09-20',
    rootCause: 'Inspection schedule not followed',
    correctiveAction: 'All extinguishers inspected and certified',
    preventiveAction: 'Monthly inspection calendar with automated reminders',
    verificationDate: '2023-09-25',
    verifiedBy: 'Sarah Johnson',
    factory: 'Plant A',
    attachments: [],
  },
];

// Mock supplier certificates
const mockSupplierCertificates: SupplierCertificate[] = [
  {
    id: 'sup-cert-1',
    supplierId: 'SUP-001',
    supplierName: 'ChemCorp Industries',
    certificateType: 'ISO-9001',
    certificateNumber: 'ISO-SUP-001',
    issueDate: '2023-05-01',
    expiryDate: '2026-04-30',
    status: 'active',
    verifiedBy: 'John Doe',
    verificationDate: '2023-05-15',
    attachments: [],
  },
];

export const useCertificateStore = create<CertificateState>()(
  persist(
    (set, get) => ({
      certificates: mockCertificates,
      audits: mockAudits,
      ncrs: mockNCRs,
      supplierCertificates: mockSupplierCertificates,

      // Certificate actions
      addCertificate: (certificate) => set((state) => {
        const daysUntilExpiry = calculateDaysUntilExpiry(certificate.expiryDate);
        const status = calculateStatus(daysUntilExpiry);
        return {
          certificates: [...state.certificates, { 
            ...certificate, 
            daysUntilExpiry,
            status 
          }],
        };
      }),

      updateCertificate: (id, updates) => set((state) => {
        const certificates = state.certificates.map(c => {
          if (c.id === id) {
            const updated = { ...c, ...updates };
            if (updates.expiryDate) {
              updated.daysUntilExpiry = calculateDaysUntilExpiry(updates.expiryDate);
              updated.status = calculateStatus(updated.daysUntilExpiry);
            }
            return updated;
          }
          return c;
        });
        return { certificates };
      }),

      deleteCertificate: (id) => set((state) => ({
        certificates: state.certificates.filter(c => c.id !== id),
      })),

      getCertificateById: (id) => {
        return get().certificates.find(c => c.id === id);
      },

      getExpiringCertificates: (days) => {
        return get().certificates.filter(c => 
          c.daysUntilExpiry !== undefined && 
          c.daysUntilExpiry > 0 && 
          c.daysUntilExpiry <= days
        );
      },

      getExpiredCertificates: () => {
        return get().certificates.filter(c => 
          c.daysUntilExpiry !== undefined && c.daysUntilExpiry < 0
        );
      },

      // Audit actions
      addAudit: (audit) => set((state) => ({
        audits: [...state.audits, audit],
      })),

      updateAudit: (id, updates) => set((state) => ({
        audits: state.audits.map(a => a.id === id ? { ...a, ...updates } : a),
      })),

      getAuditsByCertificate: (certificateId) => {
        return get().audits.filter(a => a.certificateId === certificateId);
      },

      // NCR actions
      addNCR: (ncr) => set((state) => ({
        ncrs: [...state.ncrs, ncr],
      })),

      updateNCR: (id, updates) => set((state) => ({
        ncrs: state.ncrs.map(n => n.id === id ? { ...n, ...updates } : n),
      })),

      getOpenNCRs: () => {
        return get().ncrs.filter(n => n.status === 'open' || n.status === 'in-progress');
      },

      getNCRsByAudit: (auditId) => {
        return get().ncrs.filter(n => n.auditId === auditId);
      },

      // Supplier certificate actions
      addSupplierCertificate: (cert) => set((state) => ({
        supplierCertificates: [...state.supplierCertificates, cert],
      })),

      updateSupplierCertificate: (id, updates) => set((state) => ({
        supplierCertificates: state.supplierCertificates.map(c => 
          c.id === id ? { ...c, ...updates } : c
        ),
      })),

      getSupplierCertificates: (supplierId) => {
        return get().supplierCertificates.filter(c => c.supplierId === supplierId);
      },
    }),
    {
      name: 'certificate-storage',
    }
  )
);
