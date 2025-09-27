"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Car, Wrench, DollarSign, TrendingUp, AlertTriangle, Calendar, BarChart3, Plus } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-8 border border-primary/20">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Maintenance Cost Prediction System</h1>
          <p className="text-xl text-muted-foreground mb-6 text-pretty">
            Unlock unparalleled business performance with real-time insights, automation, and predictive maintenance
            analytics for your automotive fleet.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="animate-glow">
              <Plus className="mr-2 h-5 w-5" />
              Add New Vehicle
            </Button>
            <Button variant="outline" size="lg">
              <BarChart3 className="mr-2 h-5 w-5" />
              View Analytics
            </Button>
          </div>
        </div>
        {/* Futuristic background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-2xl"></div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-400">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">18</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-400">3 urgent</span> items
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Costs</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$24,580</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-400">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-400">+2.1%</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Maintenance Alerts */}
        <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              Urgent Maintenance Alerts
            </CardTitle>
            <CardDescription>Vehicles requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                vehicle: "2019 Toyota Camry",
                vin: "1HGBH41JXMN109186",
                issue: "Brake Pad Replacement",
                severity: "High",
                dueDate: "2 days overdue",
                cost: "$320",
              },
              {
                vehicle: "2020 Honda Accord",
                vin: "1HGCV1F30LA123456",
                issue: "Oil Change",
                severity: "Medium",
                dueDate: "Due in 3 days",
                cost: "$65",
              },
              {
                vehicle: "2018 BMW 320i",
                vin: "WBA8E1C51JA123456",
                issue: "Transmission Service",
                severity: "High",
                dueDate: "1 week overdue",
                cost: "$450",
              },
            ].map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{alert.vehicle}</h4>
                    <Badge variant={alert.severity === "High" ? "destructive" : "secondary"}>{alert.severity}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">VIN: {alert.vin}</p>
                  <p className="text-sm text-foreground">{alert.issue}</p>
                  <p className="text-xs text-muted-foreground">{alert.dueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{alert.cost}</p>
                  <Button size="sm" className="mt-2">
                    Schedule
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cost Predictions */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Cost Predictions
            </CardTitle>
            <CardDescription>Next 30 days forecast</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Routine Maintenance</span>
                <span className="font-medium">$8,200</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Major Repairs</span>
                <span className="font-medium">$3,400</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Emergency Fixes</span>
                <span className="font-medium">$1,200</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Predicted</span>
                <span className="text-xl font-bold text-primary">$12,800</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">94% confidence level</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest maintenance records and system updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "2 hours ago",
                action: "Completed oil change",
                vehicle: "2021 Honda Civic",
                cost: "$55",
                type: "maintenance",
              },
              {
                time: "5 hours ago",
                action: "Added new vehicle",
                vehicle: "2023 Toyota RAV4",
                cost: null,
                type: "system",
              },
              {
                time: "1 day ago",
                action: "Brake pad replacement",
                vehicle: "2018 Ford F-150",
                cost: "$280",
                type: "maintenance",
              },
              {
                time: "2 days ago",
                action: "Generated cost prediction",
                vehicle: "Fleet Analysis",
                cost: "$15,200",
                type: "prediction",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "maintenance"
                        ? "bg-green-400"
                        : activity.type === "system"
                          ? "bg-blue-400"
                          : "bg-orange-400"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.vehicle} • {activity.time}
                    </p>
                  </div>
                </div>
                {activity.cost && <span className="text-sm font-medium text-primary">{activity.cost}</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
