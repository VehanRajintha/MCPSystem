"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Car,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChartIcon,
  Download,
  RefreshCw,
} from "lucide-react"

// Mock analytics data
const monthlyMaintenanceCosts = [
  { month: "Jan", cost: 45200, predictions: 38900, vehicles: 245 },
  { month: "Feb", cost: 52100, predictions: 49800, vehicles: 247 },
  { month: "Mar", cost: 48900, predictions: 46200, vehicles: 249 },
  { month: "Apr", cost: 61200, predictions: 58400, vehicles: 251 },
  { month: "May", cost: 55800, predictions: 53100, vehicles: 253 },
  { month: "Jun", cost: 49300, predictions: 47600, vehicles: 255 },
]

const maintenanceTypeBreakdown = [
  { name: "Routine Service", value: 35, cost: 125000, color: "#FF6B35" },
  { name: "Brake System", value: 20, cost: 89000, color: "#F7931E" },
  { name: "Engine Service", value: 15, cost: 156000, color: "#FFD23F" },
  { name: "Transmission", value: 12, cost: 98000, color: "#06FFA5" },
  { name: "Electrical", value: 10, cost: 67000, color: "#4ECDC4" },
  { name: "Other", value: 8, cost: 45000, color: "#45B7D1" },
]

const vehiclePerformanceData = [
  { make: "Toyota", avgCost: 1250, reliability: 94, count: 85 },
  { make: "Honda", avgCost: 1180, reliability: 92, count: 67 },
  { make: "Ford", avgCost: 1420, reliability: 88, count: 45 },
  { make: "BMW", avgCost: 2100, reliability: 85, count: 23 },
  { make: "Mercedes", avgCost: 2350, reliability: 83, count: 18 },
  { make: "Mazda", avgCost: 1320, reliability: 90, count: 34 },
]

const predictionAccuracyTrend = [
  { week: "W1", accuracy: 89.2, predictions: 145 },
  { week: "W2", accuracy: 91.5, predictions: 167 },
  { week: "W3", accuracy: 93.1, predictions: 189 },
  { week: "W4", accuracy: 94.8, predictions: 203 },
  { week: "W5", accuracy: 96.2, predictions: 221 },
  { week: "W6", accuracy: 94.5, predictions: 198 },
]

const fleetHealthMetrics = {
  totalVehicles: 255,
  activeMaintenanceAlerts: 23,
  scheduledServices: 67,
  overdueMaintenance: 8,
  averageVehicleAge: 4.2,
  totalMileage: 12450000,
  monthlyMaintenanceCost: 55800,
  costPerVehicle: 219,
  predictedSavings: 12400,
  maintenanceCompliance: 94.2,
}

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("cost")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive fleet maintenance analytics and insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Cost</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(fleetHealthMetrics.monthlyMaintenanceCost)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">-8.2% vs last month</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fleet Vehicles</p>
                <p className="text-2xl font-bold text-foreground">{fleetHealthMetrics.totalVehicles}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+2 this month</span>
                </div>
              </div>
              <Car className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-foreground">{fleetHealthMetrics.activeMaintenanceAlerts}</p>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4 text-orange-400 mr-1" />
                  <span className="text-sm text-orange-400">8 high priority</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance Rate</p>
                <p className="text-2xl font-bold text-foreground">{fleetHealthMetrics.maintenanceCompliance}%</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Excellent</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="costs"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Cost Analysis
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Fleet Performance
          </TabsTrigger>
          <TabsTrigger
            value="predictions"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Prediction Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Monthly Maintenance Trends */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Monthly Maintenance Trends
              </CardTitle>
              <CardDescription>Actual vs predicted maintenance costs over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyMaintenanceCosts}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={formatCurrency} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [formatCurrency(value), ""]}
                    />
                    <Area
                      type="monotone"
                      dataKey="predictions"
                      stackId="1"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      name="Predicted Costs"
                    />
                    <Area
                      type="monotone"
                      dataKey="cost"
                      stackId="2"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.6}
                      name="Actual Costs"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Fleet Health Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                  Maintenance Type Distribution
                </CardTitle>
                <CardDescription>Breakdown of maintenance activities by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={maintenanceTypeBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {maintenanceTypeBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value}%`, "Percentage"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {maintenanceTypeBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                      <span className="text-sm font-medium ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Fleet Health Indicators</CardTitle>
                <CardDescription>Key performance indicators for fleet maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div>
                    <p className="font-medium text-foreground">Average Vehicle Age</p>
                    <p className="text-sm text-muted-foreground">Fleet average</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{fleetHealthMetrics.averageVehicleAge} years</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Good</Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div>
                    <p className="font-medium text-foreground">Total Fleet Mileage</p>
                    <p className="text-sm text-muted-foreground">Cumulative miles</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{formatNumber(fleetHealthMetrics.totalMileage)}</p>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">High</Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div>
                    <p className="font-medium text-foreground">Cost Per Vehicle</p>
                    <p className="text-sm text-muted-foreground">Monthly average</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(fleetHealthMetrics.costPerVehicle)}
                    </p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Below Target</Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <div>
                    <p className="font-medium text-foreground">Predicted Savings</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-400">
                      {formatCurrency(fleetHealthMetrics.predictedSavings)}
                    </p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          {/* Cost Analysis Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Monthly Cost Breakdown</CardTitle>
                <CardDescription>Detailed cost analysis by maintenance type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={maintenanceTypeBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={formatCurrency} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [formatCurrency(value), "Cost"]}
                      />
                      <Bar dataKey="cost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Cost Efficiency Trends</CardTitle>
                <CardDescription>Cost per vehicle over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyMaintenanceCosts}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="cost"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                        name="Cost per Vehicle"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Summary Table */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Cost Summary by Category</CardTitle>
              <CardDescription>Detailed breakdown of maintenance costs and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium text-muted-foreground">Category</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Total Cost</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Avg per Vehicle</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Frequency</th>
                      <th className="text-right p-3 font-medium text-muted-foreground">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceTypeBreakdown.map((item, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="font-medium text-foreground">{item.name}</span>
                          </div>
                        </td>
                        <td className="text-right p-3 font-medium text-foreground">{formatCurrency(item.cost)}</td>
                        <td className="text-right p-3 text-muted-foreground">
                          {formatCurrency(Math.round(item.cost / fleetHealthMetrics.totalVehicles))}
                        </td>
                        <td className="text-right p-3 text-muted-foreground">{item.value}%</td>
                        <td className="text-right p-3">
                          {index % 2 === 0 ? (
                            <div className="flex items-center justify-end gap-1">
                              <TrendingDown className="h-4 w-4 text-green-400" />
                              <span className="text-green-400 text-sm">-5.2%</span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-1">
                              <TrendingUp className="h-4 w-4 text-red-400" />
                              <span className="text-red-400 text-sm">+3.1%</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Vehicle Performance by Make */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Fleet Performance by Make</CardTitle>
              <CardDescription>
                Average maintenance costs and reliability scores by vehicle manufacturer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vehiclePerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="make" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={formatCurrency} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [formatCurrency(value), "Avg Cost"]}
                    />
                    <Bar dataKey="avgCost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehiclePerformanceData.map((make, index) => (
              <Card
                key={index}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{make.make}</CardTitle>
                  <CardDescription>{make.count} vehicles in fleet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg Monthly Cost</span>
                    <span className="font-bold text-primary">{formatCurrency(make.avgCost)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Reliability Score</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-400">{make.reliability}%</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {make.reliability >= 90 ? "Excellent" : make.reliability >= 85 ? "Good" : "Fair"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Fleet Share</span>
                    <span className="font-medium text-foreground">
                      {Math.round((make.count / fleetHealthMetrics.totalVehicles) * 100)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          {/* Prediction Accuracy Trends */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Prediction Accuracy Over Time</CardTitle>
              <CardDescription>AI model performance and prediction accuracy trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictionAccuracyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Accuracy"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                      name="Prediction Accuracy"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Prediction Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Accuracy</p>
                    <p className="text-2xl font-bold text-green-400">94.2%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Predictions Made</p>
                    <p className="text-2xl font-bold text-foreground">1,247</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Cost Variance</p>
                    <p className="text-2xl font-bold text-green-400">±8.3%</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Time Variance</p>
                    <p className="text-2xl font-bold text-orange-400">±3.2 days</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
