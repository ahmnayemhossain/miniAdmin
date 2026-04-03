import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Bell, CheckCircle, Eye, AlertTriangle, Info, XCircle } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { StatusBadge } from "../components/design-system/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { useDateFilterStore } from "../store";
import { DateFilter } from "../components/DateFilter";

interface Alert {
  id: number;
  title: string;
  description: string;
  type: "critical" | "warning" | "info";
  category: string;
  timestamp: string;
  isRead: boolean;
  actionRequired: boolean;
  source: string;
}

const mockAlerts: Alert[] = [
  {
    id: 1,
    title: "Critical Stock Level",
    description: "Hydrochloric Acid below minimum threshold (35L remaining)",
    type: "critical",
    category: "Inventory",
    timestamp: "2 hours ago",
    isRead: false,
    actionRequired: true,
    source: "Chemical Management",
  },
  {
    id: 2,
    title: "Compliance Check Due",
    description: "Monthly chemical inventory audit due in 2 days",
    type: "warning",
    category: "Compliance",
    timestamp: "5 hours ago",
    isRead: false,
    actionRequired: true,
    source: "Compliance & Audit",
  },
  {
    id: 3,
    title: "High Water Usage Detected",
    description: "Production line A exceeded daily target by 60%",
    type: "warning",
    category: "Water",
    timestamp: "1 day ago",
    isRead: true,
    actionRequired: false,
    source: "Water Management",
  },
  {
    id: 4,
    title: "MSDS Update Available",
    description: "3 chemical safety data sheets have been updated by suppliers",
    type: "info",
    category: "Documentation",
    timestamp: "1 day ago",
    isRead: true,
    actionRequired: true,
    source: "MSDS Management",
  },
  {
    id: 5,
    title: "Safety Equipment Inspection Failed",
    description: "Fire extinguisher in Storage A-12 requires immediate replacement",
    type: "critical",
    category: "Safety",
    timestamp: "2 days ago",
    isRead: false,
    actionRequired: true,
    source: "Safety",
  },
  {
    id: 6,
    title: "Waste Disposal Completed",
    description: "120kg recyclable waste successfully processed",
    type: "info",
    category: "Waste",
    timestamp: "3 days ago",
    isRead: true,
    actionRequired: false,
    source: "Waste Management",
  },
  {
    id: 7,
    title: "Low Stock Warning",
    description: "Lab coats inventory below recommended level (18 units)",
    type: "warning",
    category: "Inventory",
    timestamp: "3 days ago",
    isRead: true,
    actionRequired: true,
    source: "Inventory",
  },
  {
    id: 8,
    title: "Sustainability Target Met",
    description: "Water usage reduced by 15% this quarter",
    type: "info",
    category: "Sustainability",
    timestamp: "5 days ago",
    isRead: true,
    actionRequired: false,
    source: "Sustainability",
  },
];

export function Alerts() {
  const [selectedTab, setSelectedTab] = useState("all");
  const { dateRange } = useDateFilterStore();
  
  const filteredAlerts = mockAlerts.filter((alert) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "unread") return !alert.isRead;
    if (selectedTab === "action") return alert.actionRequired;
    return true;
  });

  const unreadCount = mockAlerts.filter(a => !a.isRead).length;
  const actionRequiredCount = mockAlerts.filter(a => a.actionRequired && !a.isRead).length;

  const handleMarkAsRead = (alertId: number) => {
    toast.success("Alert marked as read");
  };

  const handleResolve = (alert: Alert) => {
    toast.success(`Resolving: ${alert.title}`);
  };

  const handleViewDetails = (alert: Alert) => {
    toast.info(`Viewing details for: ${alert.title}`);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div>
      <PageHeader
        title="Alerts & Notifications"
        description="Actionable alerts only - no noise"
      >
        <div className="flex justify-end mt-4">
          <DateFilter />
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total Alerts</div>
            <div className="text-2xl font-bold mt-1">{mockAlerts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Unread</div>
            <div className="text-2xl font-bold mt-1 text-blue-600">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Action Required</div>
            <div className="text-2xl font-bold mt-1 text-amber-600">{actionRequiredCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Critical</div>
            <div className="text-2xl font-bold mt-1 text-red-600">
              {mockAlerts.filter(a => a.type === "critical").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All Alerts
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-blue-600">{unreadCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="action">
            Action Required
            {actionRequiredCount > 0 && (
              <Badge className="ml-2 bg-amber-600">{actionRequiredCount}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <Card 
                key={alert.id}
                className={
                  !alert.isRead ? "border-l-4 border-l-blue-600 bg-blue-50/30" : ""
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="mt-1">
                      {getAlertIcon(alert.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                            {!alert.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{alert.description}</p>
                        </div>
                        <StatusBadge 
                          status={
                            alert.type === "critical" ? "critical" :
                            alert.type === "warning" ? "warning" :
                            "info"
                          }
                        >
                          {alert.type}
                        </StatusBadge>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span>{alert.timestamp}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {alert.category}
                        </Badge>
                        <span>•</span>
                        <span>{alert.source}</span>
                        {alert.actionRequired && (
                          <>
                            <span>•</span>
                            <Badge className="bg-amber-100 text-amber-800 text-xs">
                              Action Required
                            </Badge>
                          </>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!alert.isRead && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkAsRead(alert.id)}
                            className="gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Mark as Read
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDetails(alert)}
                          className="gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        {alert.actionRequired && (
                          <Button 
                            size="sm"
                            onClick={() => handleResolve(alert)}
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAlerts.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
                <p className="text-gray-600">You're all caught up!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}