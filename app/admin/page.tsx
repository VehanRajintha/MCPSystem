"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Shield,
  Settings,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Key,
  Server,
} from "lucide-react"

// Mock admin data
const systemStats = {
  totalUsers: 47,
  activeUsers: 42,
  pendingApprovals: 5,
  systemUptime: "99.8%",
  databaseSize: "2.4 GB",
  apiRequests: 15420,
  errorRate: "0.2%",
  lastBackup: "2024-03-22 02:00:00",
}

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@punchicar.com",
    role: "Administrator",
    department: "IT",
    status: "active",
    lastLogin: "2024-03-22 14:30:00",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@punchicar.com",
    role: "Manager",
    department: "Operations",
    status: "active",
    lastLogin: "2024-03-22 09:15:00",
    createdAt: "2024-02-01",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@punchicar.com",
    role: "Mechanic",
    department: "Maintenance",
    status: "pending",
    lastLogin: null,
    createdAt: "2024-03-20",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@punchicar.com",
    role: "Analyst",
    department: "Analytics",
    status: "inactive",
    lastLogin: "2024-03-15 16:45:00",
    createdAt: "2024-01-20",
  },
]

const systemLogs = [
  {
    id: 1,
    timestamp: "2024-03-22 14:35:00",
    level: "info",
    message: "User john.doe@punchicar.com logged in successfully",
    source: "Authentication",
  },
  {
    id: 2,
    timestamp: "2024-03-22 14:30:00",
    level: "warning",
    message: "High CPU usage detected on prediction server",
    source: "System Monitor",
  },
  {
    id: 3,
    timestamp: "2024-03-22 14:25:00",
    level: "error",
    message: "Failed to connect to external API endpoint",
    source: "API Gateway",
  },
  {
    id: 4,
    timestamp: "2024-03-22 14:20:00",
    level: "info",
    message: "Database backup completed successfully",
    source: "Database",
  },
]

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case "error":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Error</Badge>
      case "warning":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Warning</Badge>
      case "info":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Info</Badge>
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Management</h1>
          <p className="text-muted-foreground">System administration and user management</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account for the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="john.doe@punchicar.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrator">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="mechanic">Mechanic</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create User</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">{systemStats.totalUsers}</p>
                <p className="text-sm text-green-400">{systemStats.activeUsers} active</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold text-green-400">{systemStats.systemUptime}</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold text-orange-400">{systemStats.pendingApprovals}</p>
                <p className="text-sm text-muted-foreground">Require attention</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Database Size</p>
                <p className="text-2xl font-bold text-primary">{systemStats.databaseSize}</p>
                <p className="text-sm text-muted-foreground">Growing steadily</p>
              </div>
              <Database className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            User Management
          </TabsTrigger>
          <TabsTrigger
            value="system"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            System Settings
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            System Logs
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Filters */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name, email, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full sm:w-48 bg-secondary/50">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Mechanic">Mechanic</SelectItem>
                    <SelectItem value="Analyst">Analyst</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-48 bg-secondary/50">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            <Shield className="w-3 h-3 mr-1" />
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.department}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          {/* System Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  General Settings
                </CardTitle>
                <CardDescription>Configure system-wide settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">System Name</label>
                  <Input defaultValue="Punchi Car Niwasa Maintenance System" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maintenance Window</label>
                  <Select defaultValue="sunday-2am">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday-2am">Sunday 2:00 AM</SelectItem>
                      <SelectItem value="saturday-2am">Saturday 2:00 AM</SelectItem>
                      <SelectItem value="daily-2am">Daily 2:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout (minutes)</label>
                  <Input type="number" defaultValue="60" />
                </div>
                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Database Management
                </CardTitle>
                <CardDescription>Database maintenance and backup settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div>
                    <p className="font-medium text-foreground">Database Size</p>
                    <p className="text-sm text-muted-foreground">{systemStats.databaseSize}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Healthy</Badge>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div>
                    <p className="font-medium text-foreground">Last Backup</p>
                    <p className="text-sm text-muted-foreground">{systemStats.lastBackup}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Success</Badge>
                </div>
                <div className="space-y-2">
                  <Button className="w-full">
                    <Database className="mr-2 h-4 w-4" />
                    Create Backup Now
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Auto-Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API and Integration Settings */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                API & Integration Settings
              </CardTitle>
              <CardDescription>Configure external integrations and API settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">API Rate Limiting</h4>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Requests per minute</label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Prediction Model</h4>
                  <Select defaultValue="v2.1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v2.1">Model v2.1 (Current)</SelectItem>
                      <SelectItem value="v2.0">Model v2.0</SelectItem>
                      <SelectItem value="v1.8">Model v1.8</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Data Retention</h4>
                  <Select defaultValue="2years">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="2years">2 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          {/* System Logs */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>System Activity Logs</CardTitle>
              <CardDescription>Monitor system events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border/50"
                  >
                    <div className="flex-shrink-0">{getLogLevelBadge(log.level)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{log.message}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                        <p className="text-xs text-muted-foreground">Source: {log.source}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Button variant="outline">Load More Logs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Authentication Settings
                </CardTitle>
                <CardDescription>Configure authentication and access policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password Policy</label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                      <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                      <SelectItem value="complex">Complex (16+ chars, symbols required)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Failed Login Attempts</label>
                  <Input type="number" defaultValue="5" />
                  <p className="text-xs text-muted-foreground">Account locked after this many failed attempts</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Lockout Duration (minutes)</label>
                  <Input type="number" defaultValue="30" />
                </div>
                <Button className="w-full">Update Security Settings</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  API Security
                </CardTitle>
                <CardDescription>Manage API keys and access tokens</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border/50">
                    <div>
                      <p className="font-medium text-foreground">Production API Key</p>
                      <p className="text-sm text-muted-foreground">pk_live_****...****</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border/50">
                    <div>
                      <p className="font-medium text-foreground">Development API Key</p>
                      <p className="text-sm text-muted-foreground">pk_test_****...****</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Generate New API Key
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Key className="mr-2 h-4 w-4" />
                    Rotate Existing Keys
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Monitoring */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Security Monitoring</CardTitle>
              <CardDescription>Recent security events and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-medium text-foreground">System Security Status: Good</p>
                    <p className="text-sm text-muted-foreground">No security threats detected in the last 24 hours</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-secondary/30 border border-border/50">
                    <p className="text-2xl font-bold text-green-400">0</p>
                    <p className="text-sm text-muted-foreground">Failed Login Attempts</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/30 border border-border/50">
                    <p className="text-2xl font-bold text-green-400">0</p>
                    <p className="text-sm text-muted-foreground">Suspicious Activities</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-secondary/30 border border-border/50">
                    <p className="text-2xl font-bold text-primary">{systemStats.apiRequests}</p>
                    <p className="text-sm text-muted-foreground">API Requests Today</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
