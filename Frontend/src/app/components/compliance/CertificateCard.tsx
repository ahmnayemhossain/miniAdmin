import { Award, Calendar, FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import type { Certificate } from "../../store/types";

interface CertificateCardProps {
  certificate: Certificate;
  onView?: (certificate: Certificate) => void;
  onRenew?: (certificate: Certificate) => void;
}

export function CertificateCard({ certificate, onView, onRenew }: CertificateCardProps) {
  const getStatusBadge = () => {
    switch (certificate.status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'expiring-soon':
        return (
          <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Expiring Soon
          </Badge>
        );
      case 'expired':
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        );
      case 'pending-renewal':
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending Renewal
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTimelineProgress = () => {
    const issueDate = new Date(certificate.issueDate);
    const expiryDate = new Date(certificate.expiryDate);
    const today = new Date();
    
    const totalDays = (expiryDate.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24);
    const daysPassed = (today.getTime() - issueDate.getTime()) / (1000 * 60 * 60 * 24);
    
    return Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
  };

  const progress = getTimelineProgress();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{certificate.certificateName}</h3>
              <p className="text-sm text-muted-foreground">{certificate.certificateType}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Certificate Number:</span>
            <span className="font-medium text-foreground">{certificate.certificateNumber}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Issued By:</span>
            <span className="font-medium text-foreground">{certificate.issuedBy}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Scope:</span>
            <span className="font-medium text-foreground text-right">{certificate.scope}</span>
          </div>

          {certificate.score && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Score:</span>
              <span className="font-medium text-foreground">{certificate.score}%</span>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
            <span>{new Date(certificate.expiryDate).toLocaleDateString()}</span>
          </div>
          <Progress value={progress} className="h-2" />
          {certificate.daysUntilExpiry !== undefined && (
            <p className="text-xs text-center mt-2 text-muted-foreground">
              {certificate.daysUntilExpiry > 0 
                ? `${certificate.daysUntilExpiry} days remaining` 
                : `Expired ${Math.abs(certificate.daysUntilExpiry)} days ago`}
            </p>
          )}
        </div>

        {/* Next Audit */}
        {certificate.nextAuditDate && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-muted-foreground">Next Audit:</span>
              <span className="font-medium text-foreground">
                {new Date(certificate.nextAuditDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView?.(certificate)}
          >
            <FileText className="w-4 h-4 mr-2" />
            View Details
          </Button>
          {(certificate.status === 'expiring-soon' || certificate.status === 'expired') && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onRenew?.(certificate)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Renew
            </Button>
          )}
        </div>

        {/* Attachments */}
        {certificate.attachments.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="w-3 h-3" />
              <span>{certificate.attachments.length} attachment(s)</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
