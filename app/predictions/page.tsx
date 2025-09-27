"use client"

import { useState } from "react"

type Prediction = {
  id: number;
  vehicleId: number;
  vehicle: string;
  vin: string;
  imageUrl: string;
  maintenanceType: string;
  predictedDate: string;
  predictedMileage: number;
  estimatedCost: number;
  confidence: number;
  priority: string;
  factors: string[];
  daysUntil: number;
};
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import {
  Brain,
  Calculator,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Car,
  Wrench,
  BarChart3,
  Zap,
  Target,
  Search,
} from "lucide-react"
import { PredictionWizard } from "@/components/predictions/prediction-wizard"

// Mock prediction data
const mockPredictions = [
  {
    id: 1,
    vehicleId: 1,
    vehicle: "2019 Toyota Camry",
    vin: "1HGBH41JXMN109186",
  imageUrl: "/toyota-camry.png",
    maintenanceType: "Brake Pad Replacement",
    predictedDate: "2024-04-15",
    predictedMileage: 47000,
    estimatedCost: 320,
    confidence: 94,
    priority: "high",
    factors: ["Vehicle Age", "Brake Usage Pattern", "Historical Data"],
    daysUntil: 23,
  },
  {
    id: 2,
    vehicleId: 2,
    vehicle: "2020 Honda Accord",
    vin: "1HGCV1F30LA123456",
  imageUrl: "/honda-accord.png",
    maintenanceType: "Transmission Service",
    predictedDate: "2024-05-20",
    predictedMileage: 35000,
    estimatedCost: 450,
    confidence: 87,
    priority: "medium",
    factors: ["Mileage Threshold", "Service History", "Vehicle Model"],
    daysUntil: 58,
  },
  {
    id: 3,
    vehicleId: 3,
    vehicle: "2018 BMW 320i",
    vin: "WBA8E1C51JA123456",
  imageUrl: "/bmw-320i.png",
    maintenanceType: "Timing Belt Replacement",
    predictedDate: "2024-06-10",
    predictedMileage: 72000,
    estimatedCost: 850,
    confidence: 91,
    priority: "high",
    factors: ["Mileage Interval", "Engine Type", "Manufacturer Specs"],
    daysUntil: 79,
  },
  {
    id: 4,
    vehicleId: 4,
    vehicle: "2021 Mazda CX-5",
    vin: "JM1BK32F781234567",
  imageUrl: "/mazda-cx5.png",
    maintenanceType: "Oil Change",
    predictedDate: "2024-04-05",
    predictedMileage: 30000,
    estimatedCost: 65,
    confidence: 98,
    priority: "low",
    factors: ["Service Interval", "Oil Type", "Driving Conditions"],
    daysUntil: 13,
  },
]

const mockFleetPredictions = {
  totalVehicles: 247,
  predictionsGenerated: 1847,
  averageAccuracy: 94.2,
  totalPredictedCosts: 284750,
  upcomingMaintenanceCount: 67,
  highPriorityCount: 18,
}

export default function PredictionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleLocation, setScheduleLocation] = useState("Authorized Dealer")
  const [scheduleNotes, setScheduleNotes] = useState("")
  const [scheduleSuccess, setScheduleSuccess] = useState(false)
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 2 // Number of predictions per page

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertTriangle className="w-3 h-3 mr-1" />
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-400"
    if (confidence >= 75) return "text-orange-400"
    return "text-red-400"
  }

  const filteredPredictions = mockPredictions.filter((prediction) => {
    const matchesSearch =
      prediction.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prediction.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prediction.maintenanceType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPriority = selectedPriority === "all" || prediction.priority === selectedPriority

    return matchesSearch && matchesPriority
  })
  const totalPages = Math.ceil(filteredPredictions.length / pageSize)
  // Paginated predictions
  const paginatedPredictions = filteredPredictions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )
  return (
    <>
      {/* Schedule Service Modal - no blur overlay, just Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Service</DialogTitle>
            <DialogDescription>
              Book a maintenance appointment for your vehicle
            </DialogDescription>
          </DialogHeader>
          {selectedPrediction && !scheduleSuccess && (
            <form
              className="space-y-4"
              onSubmit={e => {
                e.preventDefault()
                setScheduleSuccess(true)
              }}
            >
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Vehicle</label>
                <div className="font-bold text-foreground">{selectedPrediction.vehicle}</div>
                <div className="text-xs text-muted-foreground">VIN: {selectedPrediction.vin}</div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Service Type</label>
                <div className="font-medium text-foreground">{selectedPrediction.maintenanceType}</div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground" htmlFor="schedule-date">Preferred Date</label>
                <input
                  id="schedule-date"
                  type="date"
                  className="w-full border rounded px-3 py-2 bg-secondary/30 border-border/50"
                  value={scheduleDate}
                  onChange={e => setScheduleDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground" htmlFor="schedule-location">Service Location</label>
                <select
                  id="schedule-location"
                  className="w-full border rounded px-3 py-2 bg-secondary/30 border-border/50"
                  value={scheduleLocation}
                  onChange={e => setScheduleLocation(e.target.value)}
                >
                  <option value="Authorized Dealer">Authorized Dealer</option>
                  <option value="Preferred Workshop">Preferred Workshop</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground" htmlFor="schedule-notes">Notes (optional)</label>
                <textarea
                  id="schedule-notes"
                  className="w-full border rounded px-3 py-2 bg-secondary/30 border-border/50"
                  value={scheduleNotes}
                  onChange={e => setScheduleNotes(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="flex justify-end pt-2 gap-2">
                <Button variant="secondary" type="button" onClick={() => setIsScheduleOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground">
                  Confirm Booking
                </Button>
              </div>
            </form>
          )}
          {scheduleSuccess && (
            <div className="space-y-4 text-center py-8">
              <div className="text-2xl text-green-400 font-bold">Service Scheduled!</div>
              <div className="text-muted-foreground">Your appointment for <span className="font-bold">{selectedPrediction?.vehicle}</span> is booked on <span className="font-bold">{scheduleDate}</span> at <span className="font-bold">{scheduleLocation}</span>.</div>
              <Button variant="secondary" onClick={() => setIsScheduleOpen(false)}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Main page content */}
      <div className="p-6 space-y-6 animate-fade-in-up relative">
        {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Maintenance Predictions</h1>
          <p className="text-muted-foreground">AI-powered maintenance cost and schedule predictions</p>
        </div>
        <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
          <DialogTrigger asChild>
            <Button className="animate-glow">
              <Brain className="mr-2 h-4 w-4" />
              Generate Predictions
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Prediction Generation Wizard</DialogTitle>
              <DialogDescription>Configure parameters for generating maintenance predictions</DialogDescription>
            </DialogHeader>
            <PredictionWizard onClose={() => setIsWizardOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Fleet Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fleet Vehicles</p>
                <p className="text-2xl font-bold text-foreground">{mockFleetPredictions.totalVehicles}</p>
              </div>
              <Car className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Predictions Generated</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockFleetPredictions.predictionsGenerated.toLocaleString()}
                </p>
              </div>
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Accuracy</p>
                <p className="text-2xl font-bold text-green-400">{mockFleetPredictions.averageAccuracy}%</p>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Predicted Costs</p>
                <p className="text-2xl font-bold text-primary">
                  ${mockFleetPredictions.totalPredictedCosts.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="predictions" className="space-y-6">
  <TabsList className="inline-flex gap-32 w-auto bg-secondary/50">
          <TabsTrigger
            value="predictions"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 py-1 text-sm w-4 mx-10 flex justify-center items-center"
          >
            Active Predictions
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 py-1 text-sm w-44 flex justify-center items-center"
          >
            Prediction Analytics
          </TabsTrigger>
          <TabsTrigger
            value="models"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-2 py-1 text-sm w-44 flex justify-center items-center"
          >
            AI Models
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          {/* Search and Filters */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by vehicle, VIN, or maintenance type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border"
                  />
                </div>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-full sm:w-48 bg-secondary/50">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Predictions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paginatedPredictions.map((prediction) => (
              <Card
                key={prediction.id}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                {/* ...existing code for CardHeader, CardContent, etc... */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={prediction.imageUrl || "/placeholder.jpg"}
                        alt={prediction.vehicle}
                        className="w-40 h-40 object-cover rounded-2xl border border-border/30 bg-muted"
                      />
                      <div>
                        <CardTitle className="text-lg">{prediction.vehicle}</CardTitle>
                        <CardDescription className="font-mono text-xs">{prediction.vin}</CardDescription>
                      </div>
                    </div>
                    {getPriorityBadge(prediction.priority)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Maintenance Type */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
                    <Wrench className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{prediction.maintenanceType}</p>
                      <p className="text-sm text-muted-foreground">
                        Due: {prediction.predictedDate} • {prediction.predictedMileage.toLocaleString()} mi
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">${prediction.estimatedCost}</p>
                      <p className="text-xs text-muted-foreground">{prediction.daysUntil} days</p>
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Prediction Confidence</span>
                      <span className={`text-sm font-bold ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}%
                      </span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>

                  {/* Prediction Factors */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Key Factors</p>
                    <div className="flex flex-wrap gap-2">
                      {prediction.factors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="w-32"
                      onClick={() => {
                        setSelectedPrediction(prediction)
                        setIsScheduleOpen(true)
                        setScheduleSuccess(false)
                        setScheduleDate("")
                        setScheduleLocation("Authorized Dealer")
                        setScheduleNotes("")
                      }}
                    >
                      Schedule Service
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      onClick={() => {
                        setSelectedPrediction(prediction)
                        setIsDetailsOpen(true)
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex items-center gap-2" aria-label="Pagination">
                <Button
                  variant="outline"
                  size="sm"
                  className="px-2"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  &laquo;
                </Button>
                {[...Array(totalPages)].map((_, idx) => (
                  <Button
                    key={idx}
                    variant={currentPage === idx + 1 ? "default" : "outline"}
                    size="sm"
                    className={`px-3 font-semibold ${currentPage === idx + 1 ? "bg-primary text-primary-foreground" : ""}`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="px-2"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  &raquo;
                </Button>
              </nav>
            </div>
          )}

          {/* Details Modal */}
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="max-w-xl overflow-y-auto max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Prediction Details</DialogTitle>
                <DialogDescription>
                  Detailed information for maintenance prediction
                </DialogDescription>
              </DialogHeader>
              {selectedPrediction && (
                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <img
                      src={selectedPrediction.imageUrl || "/placeholder.jpg"}
                      alt={selectedPrediction.vehicle}
                      className="w-32 h-32 object-cover rounded-2xl border border-border/30 bg-muted"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-1">{selectedPrediction.vehicle}</h2>
                      <p className="font-mono text-xs text-muted-foreground mb-2">VIN: {selectedPrediction.vin}</p>
                      {getPriorityBadge(selectedPrediction.priority)}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">{selectedPrediction.maintenanceType}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Due: {selectedPrediction.predictedDate} • {selectedPrediction.predictedMileage.toLocaleString()} mi
                    </p>
                    <p className="text-lg font-bold text-primary mb-1">${selectedPrediction.estimatedCost}</p>
                    <p className="text-xs text-muted-foreground">{selectedPrediction.daysUntil} days remaining</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <span className="text-xs text-muted-foreground">Estimated Downtime</span>
                        <div className="font-medium text-foreground">{Math.ceil(selectedPrediction.estimatedCost / 100)} day(s)</div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Service Location</span>
                        <div className="font-medium text-foreground">Authorized Dealer</div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Warranty Status</span>
                        <div className="font-medium text-green-400">{selectedPrediction.predictedMileage < 60000 ? "Covered" : "Expired"}</div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Technician</span>
                        <div className="font-medium text-foreground">Alex Perera</div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-xs text-muted-foreground">Last Service Date</span>
                        <div className="font-medium text-foreground">2024-09-15</div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-xs text-muted-foreground">Next Recommended Service</span>
                        <div className="font-medium text-foreground">{selectedPrediction.maintenanceType} in {selectedPrediction.predictedMileage + 10000} mi</div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-xs text-muted-foreground">Maintenance Notes</span>
                        <div className="text-xs text-muted-foreground">Check for additional wear and request OEM parts for best results.</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">Prediction Confidence</span>
                      <span className={`text-sm font-bold ${getConfidenceColor(selectedPrediction.confidence)}`}>
                        {selectedPrediction.confidence}%
                      </span>
                    </div>
                    <Progress value={selectedPrediction.confidence} className="h-2" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Key Factors</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPrediction.factors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button variant="secondary" onClick={() => setIsDetailsOpen(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Prediction Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Accuracy Trends
                </CardTitle>
                <CardDescription>Prediction accuracy over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last 30 Days</span>
                    <span className="text-lg font-bold text-green-400">96.2%</span>
                  </div>
                  <Progress value={96.2} className="h-3" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last 90 Days</span>
                    <span className="text-lg font-bold text-green-400">94.8%</span>
                  </div>
                  <Progress value={94.8} className="h-3" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last Year</span>
                    <span className="text-lg font-bold text-orange-400">92.1%</span>
                  </div>
                  <Progress value={92.1} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Cost Prediction Analysis
                </CardTitle>
                <CardDescription>Predicted vs actual maintenance costs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Variance</span>
                    <span className="text-lg font-bold text-green-400">±8.3%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Predicted (30d)</span>
                    <span className="text-lg font-bold text-primary">$45,200</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Actual (30d)</span>
                    <span className="text-lg font-bold text-foreground">$42,850</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Savings Identified</span>
                    <span className="text-lg font-bold text-green-400">$2,350</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Maintenance Type Breakdown */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Maintenance Type Predictions</CardTitle>
              <CardDescription>Breakdown of predicted maintenance by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { type: "Routine Maintenance", count: 45, accuracy: 97, avgCost: 120 },
                  { type: "Brake System", count: 12, accuracy: 94, avgCost: 380 },
                  { type: "Engine Service", count: 8, accuracy: 89, avgCost: 650 },
                  { type: "Transmission", count: 5, accuracy: 91, avgCost: 850 },
                  { type: "Electrical", count: 7, accuracy: 86, avgCost: 420 },
                  { type: "Suspension", count: 6, accuracy: 92, avgCost: 520 },
                ].map((category, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                    <h4 className="font-medium text-foreground mb-2">{category.type}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Predictions</span>
                        <span className="font-medium">{category.count}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accuracy</span>
                        <span className="font-medium text-green-400">{category.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Cost</span>
                        <span className="font-medium text-primary">${category.avgCost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          {/* AI Models Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Active Prediction Models
                </CardTitle>
                <CardDescription>Currently deployed AI models for maintenance prediction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Cost Prediction Model v2.1",
                    type: "Neural Network",
                    accuracy: 94.2,
                    status: "active",
                    lastTrained: "2024-02-15",
                  },
                  {
                    name: "Schedule Prediction Model v1.8",
                    type: "Random Forest",
                    accuracy: 91.7,
                    status: "active",
                    lastTrained: "2024-02-10",
                  },
                  {
                    name: "Failure Prediction Model v3.0",
                    type: "Gradient Boosting",
                    accuracy: 88.9,
                    status: "training",
                    lastTrained: "2024-02-20",
                  },
                ].map((model, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{model.name}</h4>
                        <p className="text-sm text-muted-foreground">{model.type}</p>
                      </div>
                      <Badge
                        className={
                          model.status === "active"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        }
                      >
                        {model.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Accuracy: {model.accuracy}%</span>
                      <span className="text-muted-foreground">Trained: {model.lastTrained}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Model Performance
                </CardTitle>
                <CardDescription>Real-time performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Predictions Today</span>
                    <span className="text-lg font-bold text-foreground">1,247</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Processing Time</span>
                    <span className="text-lg font-bold text-green-400">0.3s avg</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Model Uptime</span>
                    <span className="text-lg font-bold text-green-400">99.8%</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Data Points Used</span>
                    <span className="text-lg font-bold text-primary">2.4M</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Retrain Models
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Model Configuration */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
              <CardDescription>Adjust prediction parameters and model settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Prediction Horizon</h4>
                  <Select defaultValue="90">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Confidence Threshold</h4>
                  <Select defaultValue="75">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60%</SelectItem>
                      <SelectItem value="70">70%</SelectItem>
                      <SelectItem value="75">75%</SelectItem>
                      <SelectItem value="80">80%</SelectItem>
                      <SelectItem value="90">90%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Update Frequency</h4>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
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
      </Tabs>
    </div>
  </>
  )
}

