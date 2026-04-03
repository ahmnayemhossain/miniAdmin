import { PageHeader } from "../components/layout/PageHeader";
import { Settings as SettingsIcon, Building2, Link, Bell, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { SidebarCustomizer } from "../components/SidebarCustomizer";
import { toast } from "sonner";

const integrations = [
  {
    name: "SAP ERP",
    description: "Enterprise resource planning integration",
    status: "connected",
    logo: "🏢",
  },
  {
    name: "Azure IoT",
    description: "Real-time sensor data integration",
    status: "connected",
    logo: "☁️",
  },
  {
    name: "Salesforce",
    description: "Customer relationship management",
    status: "disconnected",
    logo: "💼",
  },
  {
    name: "Power BI",
    description: "Advanced analytics and reporting",
    status: "connected",
    logo: "📊",
  },
];

export function Settings() {
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  const handleToggleIntegration = (name: string) => {
    toast.info(`${name} integration toggled`);
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Configure your Mini Admin system"
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          {/* Factory Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Factory Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Factory Name</Label>
                <p className="text-sm text-muted-foreground mt-1">Plant A - Manufacturing Facility</p>
              </div>
              <Separator />
              <div>
                <Label>Location</Label>
                <p className="text-sm text-muted-foreground mt-1">123 Industrial Blvd, Manufacturing District</p>
              </div>
              <Separator />
              <div>
                <Label>Operating Hours</Label>
                <p className="text-sm text-muted-foreground mt-1">Monday - Saturday, 6:00 AM - 10:00 PM</p>
              </div>
              <div className="pt-4">
                <Button variant="outline">Edit Factory Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sidebar Customization Tab */}
        <TabsContent value="sidebar">
          <SidebarCustomizer />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Critical Alerts</Label>
                  <p className="text-sm text-muted-foreground">Immediate notification for critical issues</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when inventory is low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="pt-4">
                <Button onClick={handleSaveSettings}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div 
                    key={integration.name}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{integration.logo}</div>
                        <div>
                          <h4 className="font-semibold text-foreground">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline"
                        className={
                          integration.status === "connected"
                            ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200"
                        }
                      >
                        {integration.status}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => handleToggleIntegration(integration.name)}
                    >
                      {integration.status === "connected" ? "Configure" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security & Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Auto-logout after 30 minutes of inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Track all system access and changes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="pt-4">
                <Button variant="outline">Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}