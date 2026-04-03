import { Calendar, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import type { Certificate } from "../../store/types";

interface ComplianceCalendarProps {
  certificates: Certificate[];
  onCertificateClick?: (certificate: Certificate) => void;
}

export function ComplianceCalendar({ certificates, onCertificateClick }: ComplianceCalendarProps) {
  // Group certificates by month
  const groupedByMonth = certificates.reduce((acc, cert) => {
    const expiryDate = new Date(cert.expiryDate);
    const monthKey = `${expiryDate.getFullYear()}-${String(expiryDate.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = [];
    }
    acc[monthKey].push(cert);
    return acc;
  }, {} as Record<string, Certificate[]>);

  // Sort by month
  const sortedMonths = Object.keys(groupedByMonth).sort();

  const getStatusColor = (status: Certificate['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'expiring-soon':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'expired':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending-renewal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const formatMonthYear = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Compliance Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedMonths.slice(0, 6).map((monthKey) => {
            const certs = groupedByMonth[monthKey];
            const isCurrentOrPast = new Date(monthKey) <= new Date();
            
            return (
              <div key={monthKey} className="space-y-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-foreground">
                    {formatMonthYear(monthKey)}
                  </h4>
                  {isCurrentOrPast && (
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                
                <div className="space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  {certs.map((cert) => (
                    <div
                      key={cert.id}
                      onClick={() => onCertificateClick?.(cert)}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm text-foreground truncate">
                              {cert.certificateName}
                            </p>
                            <Badge className={getStatusColor(cert.status)} variant="secondary">
                              {cert.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {cert.certificateNumber}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>
                              Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                            </span>
                            {cert.daysUntilExpiry !== undefined && (
                              <span className="ml-2">
                                ({cert.daysUntilExpiry > 0 
                                  ? `${cert.daysUntilExpiry} days left` 
                                  : `${Math.abs(cert.daysUntilExpiry)} days overdue`})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {sortedMonths.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No upcoming certificate renewals</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
