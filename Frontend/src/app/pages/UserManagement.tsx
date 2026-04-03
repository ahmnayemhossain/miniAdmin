import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import { Plus, Mail, Shield, MoreVertical } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "active" | "inactive";
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Admin",
    department: "Operations",
    status: "active",
    lastLogin: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Manager",
    department: "Safety",
    status: "active",
    lastLogin: "1 day ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    role: "Operator",
    department: "Production",
    status: "active",
    lastLogin: "3 hours ago",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@company.com",
    role: "Supervisor",
    department: "Safety",
    status: "active",
    lastLogin: "5 hours ago",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@company.com",
    role: "Operator",
    department: "Lab",
    status: "active",
    lastLogin: "1 day ago",
  },
];

const roleColors: Record<string, string> = {
  Admin: "bg-purple-100 text-purple-800 border-purple-200",
  Manager: "bg-blue-100 text-blue-800 border-blue-200",
  Supervisor: "bg-green-100 text-green-800 border-green-200",
  Operator: "bg-gray-100 text-gray-800 border-gray-200",
};

export function UserManagement() {
  const handleAddUser = () => {
    toast.success("Add user form opened");
  };

  const handleEditUser = (user: User) => {
    toast.info(`Editing ${user.name}`);
  };

  const handleManagePermissions = (user: User) => {
    toast.info(`Managing permissions for ${user.name}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <PageHeader
        title="User Management"
        description="Simple but secure user access control"
        action={{
          label: "Add User",
          onClick: handleAddUser,
          icon: Plus,
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Total Users</div>
            <div className="text-2xl font-bold mt-1">{mockUsers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Active</div>
            <div className="text-2xl font-bold mt-1 text-green-600">
              {mockUsers.filter(u => u.status === "active").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Admins</div>
            <div className="text-2xl font-bold mt-1">
              {mockUsers.filter(u => u.role === "Admin").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-600">Departments</div>
            <div className="text-2xl font-bold mt-1">5</div>
          </CardContent>
        </Card>
      </div>

      {/* Role Templates */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Role Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <Shield className="w-6 h-6 text-purple-600 mb-2" />
              <h4 className="font-medium">Admin</h4>
              <p className="text-sm text-gray-600 mt-1">Full system access</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <Shield className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-medium">Manager</h4>
              <p className="text-sm text-gray-600 mt-1">Department oversight</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <Shield className="w-6 h-6 text-green-600 mb-2" />
              <h4 className="font-medium">Supervisor</h4>
              <p className="text-sm text-gray-600 mt-1">Team management</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <Shield className="w-6 h-6 text-gray-600 mb-2" />
              <h4 className="font-medium">Operator</h4>
              <p className="text-sm text-gray-600 mt-1">Basic operations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-600 text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={roleColors[user.role]}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-700">{user.department}</span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        user.status === "active"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleManagePermissions(user)}>
                          Manage Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Deactivate
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
    </div>
  );
}
