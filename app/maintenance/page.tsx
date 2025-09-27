"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wrench, CalendarDays, CheckCircle, AlertTriangle, Clock } from "lucide-react"

// Mock maintenance data
const mockMaintenance = [
  {
    id: 1,
    vehicle: "2019 Toyota Camry",
    type: "Brake Pad Replacement",
    date: "2024-04-15",
    status: "scheduled",
    location: "Authorized Dealer",
    technician: "Alex Perera",
    notes: "Check for additional wear. Request OEM parts.",
    cost: 320,
    confidence: 94,
  },
  {
    id: 2,
    vehicle: "2020 Honda Accord",
    type: "Transmission Service",
    date: "2024-05-20",
    status: "pending",
    location: "Preferred Workshop",
    technician: "Sarah Lee",
    notes: "Flush transmission fluid. Inspect for leaks.",
    cost: 450,
    confidence: 87,
  },
  {
    id: 3,
    vehicle: "2018 BMW 320i",
    type: "Timing Belt Replacement",
    date: "2024-06-10",
    status: "completed",
    location: "Authorized Dealer",
    technician: "Mike Davis",
    notes: "Replace belt and inspect pulleys.",
    cost: 850,
    confidence: 91,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "scheduled":
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30"><CalendarDays className="w-3 h-3 mr-1" />Scheduled</Badge>
    case "pending":
      return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
    case "completed":
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>
    case "attention":
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><AlertTriangle className="w-3 h-3 mr-1" />Needs Attention</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function MaintenancePage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Maintenance Schedule</h1>
        <p className="text-muted-foreground">View and manage upcoming, pending, and completed maintenance tasks</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMaintenance.map((item) => (
          <Card key={item.id} className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                {item.type}
              </CardTitle>
              <CardDescription>{item.vehicle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                {getStatusBadge(item.status)}
                <span className="text-sm text-muted-foreground">{item.date}</span>
              </div>
              <div className="text-sm text-muted-foreground">Location: <span className="font-medium text-foreground">{item.location}</span></div>
              <div className="text-sm text-muted-foreground">Technician: <span className="font-medium text-foreground">{item.technician}</span></div>
              <div className="text-sm text-muted-foreground">Notes: <span className="font-medium text-foreground">{item.notes}</span></div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-primary">${item.cost}</span>
                <span className="text-sm font-bold text-green-400">Confidence: {item.confidence}%</span>
              </div>
              <Progress value={item.confidence} className="h-2" />
              <div className="flex justify-end pt-2">
                <Button variant="secondary">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
