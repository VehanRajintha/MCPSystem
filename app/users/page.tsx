"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, Search, Plus, Edit, Trash2, CheckCircle, AlertTriangle } from "lucide-react"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    role: "Admin",
    status: "active",
    avatar: "/placeholder-user.jpg",
    vehicles: 3,
    joined: "2023-01-10",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    role: "User",
    status: "active",
    avatar: "/placeholder-user.jpg",
    vehicles: 2,
    joined: "2023-03-22",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.d@email.com",
    role: "User",
    status: "inactive",
    avatar: "/placeholder-user.jpg",
    vehicles: 1,
    joined: "2023-05-15",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>
    case "inactive":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><AlertTriangle className="w-3 h-3 mr-1" />Inactive</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function UsersPage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and access to the platform</p>
        </div>
        <Button className="animate-glow">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>List of all users registered on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, email, or role..." className="pl-10 bg-secondary/50 border-border" />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <User className="h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vehicles</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id} className="border-border/30 hover:bg-secondary/20">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-border/30 bg-muted" />
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.vehicles}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
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
    </div>
  )
}
