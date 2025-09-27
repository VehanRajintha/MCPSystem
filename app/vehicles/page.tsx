"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Car, Plus, Search, Filter, Eye, Edit, Trash2, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { AddVehicleForm } from "@/components/vehicles/add-vehicle-form"
import { VehicleDetailsModal } from "@/components/vehicles/vehicle-details-modal"

// Mock data for vehicles
const mockVehicles = [
  {
    id: 1,
    vin: "1HGBH41JXMN109186",
    make: "Toyota",
    model: "Camry",
    year: 2019,
    mileage: 45000,
    color: "Silver",
    status: "active",
    condition: 8,
    owner: "John Smith",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-04-15",
    estimatedValue: 18500,
    imageUrl: "/toyota-camry.png",
  },
  {
    id: 2,
    vin: "1HGCV1F30LA123456",
    make: "Honda",
    model: "Accord",
    year: 2020,
    mileage: 32000,
    color: "Black",
    status: "maintenance",
    condition: 9,
    owner: "Sarah Johnson",
    lastMaintenance: "2024-02-01",
    nextMaintenance: "2024-05-01",
    estimatedValue: 22000,
    imageUrl: "/honda-accord.png",
  },
  {
    id: 3,
    vin: "WBA8E1C51JA123456",
    make: "BMW",
    model: "320i",
    year: 2018,
    mileage: 67000,
    color: "White",
    status: "active",
    condition: 7,
    owner: "Mike Davis",
    lastMaintenance: "2023-12-10",
    nextMaintenance: "2024-03-10",
    estimatedValue: 25000,
    imageUrl: "/bmw-320i.png",
  },
  {
    id: 4,
    vin: "JM1BK32F781234567",
    make: "Mazda",
    model: "CX-5",
    year: 2021,
    mileage: 28000,
    color: "Red",
    status: "active",
    condition: 9,
    owner: "Lisa Wilson",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-04-20",
    estimatedValue: 28000,
    imageUrl: "/mazda-cx5.png",
  },
  {
    id: 5,
    vin: "KNDJN2A22F7123456",
    make: "Hyundai",
    model: "Elantra",
    year: 2017,
    mileage: 89000,
    color: "Blue",
    status: "sold",
    condition: 6,
    owner: "Robert Brown",
    lastMaintenance: "2023-11-05",
    nextMaintenance: "N/A",
    estimatedValue: 12000,
    imageUrl: "/hyundai-elantra.png",
  },
]

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVehicle, setSelectedVehicle] = useState<typeof mockVehicles[0] | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "maintenance":
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Maintenance
          </Badge>
        )
      case "sold":
        return (
          <Badge variant="secondary">
            <CheckCircle className="w-3 h-3 mr-1" />
            Sold
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getConditionColor = (condition: number) => {
    if (condition >= 8) return "text-green-400"
    if (condition >= 6) return "text-orange-400"
    return "text-red-400"
  }

  const filteredVehicles = mockVehicles.filter(
    (vehicle) =>
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vehicle Management</h1>
          <p className="text-muted-foreground">Manage your fleet and track vehicle information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="animate-glow">
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Vehicle</DialogTitle>
              <DialogDescription>Enter the vehicle details to add it to your fleet</DialogDescription>
            </DialogHeader>
            <AddVehicleForm onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Vehicles</p>
                <p className="text-2xl font-bold text-foreground">247</p>
              </div>
              <Car className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-400">198</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Maintenance</p>
                <p className="text-2xl font-bold text-orange-400">31</p>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Needs Attention</p>
                <p className="text-2xl font-bold text-red-400">18</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by make, model, VIN, or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Fleet Overview</CardTitle>
          <CardDescription>Complete list of vehicles in your fleet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Vehicle</TableHead>
                  <TableHead>VIN</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id} className="border-border/30 hover:bg-secondary/20">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={vehicle.imageUrl || "/placeholder.jpg"}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          className="w-12 h-12 object-cover rounded-lg border border-border/30 bg-muted"
                        />
                        <div>
                          <p className="font-medium text-foreground">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </p>
                          <p className="text-sm text-muted-foreground">{vehicle.color}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{vehicle.vin}</TableCell>
                    <TableCell>{vehicle.owner}</TableCell>
                    <TableCell>{vehicle.mileage.toLocaleString()} mi</TableCell>
                    <TableCell>
                      <span className={`font-medium ${getConditionColor(vehicle.condition)}`}>
                        {vehicle.condition}/10
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                    <TableCell>
                      {vehicle.nextMaintenance !== "N/A" ? (
                        <span className="text-sm">{vehicle.nextMaintenance}</span>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-primary">
                      ${vehicle.estimatedValue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedVehicle(vehicle)}>
                          <Eye className="h-4 w-4" />
                        </Button>
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

      {/* Vehicle Details Modal */}
      {selectedVehicle && (
        <VehicleDetailsModal
          vehicle={selectedVehicle}
          isOpen={!!selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </div>
  )
}
