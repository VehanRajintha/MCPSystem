"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Car, Calendar, DollarSign, Wrench, User, Phone, Edit, History, TrendingUp } from "lucide-react"

interface Vehicle {
  id: number
  vin: string
  make: string
  model: string
  year: number
  mileage: number
  color: string
  status: string
  condition: number
  owner: string
  lastMaintenance: string
  nextMaintenance: string
  estimatedValue: number
}

interface VehicleDetailsModalProps {
  vehicle: Vehicle
  isOpen: boolean
  onClose: () => void
}

export function VehicleDetailsModal({ vehicle, isOpen, onClose }: VehicleDetailsModalProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
      case "maintenance":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">In Maintenance</Badge>
      case "sold":
        return <Badge variant="secondary">Sold</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getConditionColor = (condition: number) => {
    if (condition >= 8) return "text-green-400"
    if (condition >= 6) return "text-orange-400"
    return "text-red-400"
  }

  const mockMaintenanceHistory = [
    {
      date: "2024-01-15",
      type: "Oil Change",
      cost: 65,
      mileage: 44500,
      provider: "Quick Lube Plus",
    },
    {
      date: "2023-10-20",
      type: "Brake Pad Replacement",
      cost: 320,
      mileage: 42000,
      provider: "Auto Service Center",
    },
    {
      date: "2023-07-10",
      type: "Tire Rotation",
      cost: 45,
      mileage: 40000,
      provider: "Tire World",
    },
  ]

  const mockPredictions = [
    {
      type: "Oil Change",
      dueDate: "2024-04-15",
      estimatedCost: 70,
      confidence: 95,
    },
    {
      type: "Brake Inspection",
      dueDate: "2024-06-01",
      estimatedCost: 120,
      confidence: 85,
    },
    {
      type: "Transmission Service",
      dueDate: "2024-08-15",
      estimatedCost: 280,
      confidence: 78,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Car className="h-6 w-6 text-primary" />
            {vehicle.year} {vehicle.make} {vehicle.model}
          </DialogTitle>
          <DialogDescription>Complete vehicle information and maintenance history</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vehicle Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Vehicle Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">VIN</p>
                    <p className="font-mono text-sm">{vehicle.vin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    {getStatusBadge(vehicle.status)}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-medium">{vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mileage</p>
                    <p className="font-medium">{vehicle.mileage.toLocaleString()} mi</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <p className={`font-medium ${getConditionColor(vehicle.condition)}`}>{vehicle.condition}/10</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Value</p>
                    <p className="font-medium text-primary">${vehicle.estimatedValue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Owner Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{vehicle.owner}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Phone className="h-3 w-3" />
                      Contact available in system
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance History */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Maintenance History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMaintenanceHistory.map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50"
                    >
                      <div>
                        <p className="font-medium text-foreground">{record.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.date} • {record.mileage.toLocaleString()} mi • {record.provider}
                        </p>
                      </div>
                      <p className="font-medium text-primary">${record.cost}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View Full History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Wrench className="mr-2 h-4 w-4" />
                  Schedule Maintenance
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Vehicle
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Update Value
                </Button>
              </CardContent>
            </Card>

            {/* Maintenance Schedule */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last Service</span>
                    <span className="text-sm font-medium">{vehicle.lastMaintenance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Next Service</span>
                    <span className="text-sm font-medium text-primary">{vehicle.nextMaintenance}</span>
                  </div>
                  <Separator />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Days until next service</p>
                    <p className="text-2xl font-bold text-primary">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cost Predictions */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Cost Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPredictions.map((prediction, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{prediction.type}</span>
                        <span className="text-sm font-bold text-primary">${prediction.estimatedCost}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{prediction.dueDate}</span>
                        <span>{prediction.confidence}% confidence</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
