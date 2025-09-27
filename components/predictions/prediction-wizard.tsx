"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Brain, Car, Settings, Zap, CheckCircle } from "lucide-react"

interface PredictionWizardProps {
  onClose: () => void
}

interface FormData {
  vehicleSelection: string;
  specificVehicles: string[];
  predictionHorizon: string;
  maintenanceTypes: string[];
  confidenceThreshold: string;
  includeCostPrediction: boolean;
  includeSchedulePrediction: boolean;
  includeFailurePrediction: boolean;
  useHistoricalData: boolean;
  useManufacturerSpecs: boolean;
  useDrivingPatterns: boolean;
}

export function PredictionWizard({ onClose }: PredictionWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    vehicleSelection: "all",
    specificVehicles: [],
    predictionHorizon: "90",
    maintenanceTypes: [],
    confidenceThreshold: "75",
    includeCostPrediction: true,
    includeSchedulePrediction: true,
    includeFailurePrediction: false,
    useHistoricalData: true,
    useManufacturerSpecs: true,
    useDrivingPatterns: true,
  })

  const steps = [
    { id: 1, title: "Vehicle Selection", icon: Car },
    { id: 2, title: "Prediction Parameters", icon: Settings },
    { id: 3, title: "Data Sources", icon: Brain },
    { id: 4, title: "Generate Predictions", icon: Zap },
  ]

  const maintenanceTypes = [
    "Oil Change",
    "Brake Pad Replacement",
    "Tire Rotation",
    "Transmission Service",
    "Timing Belt Replacement",
    "Air Filter Replacement",
    "Spark Plug Replacement",
    "Battery Replacement",
  // ...existing code...
    "Coolant Service",
    "Brake Fluid Change",
  ]

  const [vehicleSearchTerm, setVehicleSearchTerm] = useState("");
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      handleGenerate()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate prediction generation
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsGenerating(false)
            onClose()
          }, 1000)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleMaintenanceType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      maintenanceTypes: prev.maintenanceTypes.includes(type)
        ? prev.maintenanceTypes.filter((t) => t !== type)
        : [...prev.maintenanceTypes, type],
    }))
  }

  if (isGenerating) {
    return (
      <div className="space-y-6 py-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Generating Predictions</h3>
          <p className="text-muted-foreground">
            Our AI models are analyzing your fleet data and generating maintenance predictions...
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{generationProgress}%</span>
          </div>
          <Progress value={generationProgress} className="h-3" />
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Loading vehicle data...</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Analyzing maintenance history...</span>
          </div>
          <div className="flex items-center gap-2">
            {generationProgress >= 50 ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            )}
            <span>Running prediction models...</span>
          </div>
          <div className="flex items-center gap-2">
            {generationProgress >= 80 ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <div className="w-4 h-4 border border-border rounded-full" />
            )}
            <span>Calculating cost estimates...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              <step.icon className="w-5 h-5" />
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${currentStep > step.id ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">{steps[currentStep - 1].title}</h3>
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </p>
      </div>

      {/* Step Content */}
      <Card className="border-border/50 bg-card/50" style={{ maxHeight: '370px', overflowY: 'auto' }}>
        <CardContent className="p-4" style={{ maxHeight: '320px', overflowY: 'auto' }}>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Select Vehicles for Prediction</Label>
                <Select
                  value={formData.vehicleSelection}
                  onValueChange={(value) => updateFormData("vehicleSelection", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles (247 vehicles)</SelectItem>
                    <SelectItem value="active">Active Vehicles Only (198 vehicles)</SelectItem>
                    <SelectItem value="high-mileage">High Mileage Vehicles (45 vehicles)</SelectItem>
                    <SelectItem value="specific">Select Specific Vehicles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.vehicleSelection === "specific" && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Choose Specific Vehicles</Label>
                  <Input
                    type="text"
                    placeholder="Search vehicles..."
                    className="mb-2"
                    value={vehicleSearchTerm}
                    onChange={e => setVehicleSearchTerm(e.target.value)}
                  />
                  <div className="max-h-48 overflow-y-auto space-y-2 border border-border rounded-lg p-3">
                    {[
                      "2019 Toyota Camry - 1HGBH41JXMN109186",
                      "2020 Honda Accord - 1HGCV1F30LA123456",
                      "2018 BMW 320i - WBA8E1C51JA123456",
                      "2021 Mazda CX-5 - JM1BK32F781234567",
                      "2017 Hyundai Elantra - KNDJN2A22F7123456",
                      "2022 Ford F-150 - 1FTFW1E50NFA12345",
                      "2016 Chevrolet Malibu - 1G1ZD5ST2GF123456",
                      "2015 Nissan Altima - 1N4AL3AP9FC123456",
                      "2023 Toyota RAV4 - 2T3W1RFV0PC123456",
                      "2018 Honda Civic - 19XFC2F59JE123456",
                      "2019 Subaru Outback - 4S4BSANC3K3234567",
                      "2020 Kia Sorento - 5XYPGDA30LG123456",
                      "2017 Volkswagen Jetta - 3VW2B7AJ5HM123456",
                      "2021 Hyundai Tucson - KM8J3CA46MU123456",
                      "2016 Mazda3 - JM1BM1W7XG1234567"
                    ].filter(vehicle => vehicle.toLowerCase().includes(vehicleSearchTerm.toLowerCase())).map((vehicle, index) => {
                      const imageMap: Record<string, string> = {
                        "2019 Toyota Camry": "/toyota-camry.png",
                        "2020 Honda Accord": "/honda-accord.png",
                        "2018 BMW 320i": "/bmw-320i.png",
                        "2021 Mazda CX-5": "/mazda-cx5.png",
                        "2017 Hyundai Elantra": "/hyundai-elantra.png",
                        "2022 Ford F-150": "/ford-f150.png",
                        "2016 Chevrolet Malibu": "/chevrolet-malibu.png",
                        "2015 Nissan Altima": "/nissan-altima.png",
                        "2023 Toyota RAV4": "/toyota-rav4.png",
                        "2018 Honda Civic": "/honda-civic.png",
                        "2019 Subaru Outback": "/subaru-outback.png",
                        "2020 Kia Sorento": "/kia-sorento.png",
                        "2017 Volkswagen Jetta": "/volkswagen-jetta.png",
                        "2021 Hyundai Tucson": "/hyundai-tucson.png",
                        "2016 Mazda3": "/mazda3.png"
                      };
                      const modelMatch = vehicle.match(/^(.*?) -/);
                      const model = modelMatch ? modelMatch[1] : vehicle;
                      const imageSrc = imageMap[model] || "/placeholder.jpg";
                      const isSelected = formData.specificVehicles.includes(vehicle);
                      const handleSelect = () => {
                        setFormData((prev) => ({
                          ...prev,
                          specificVehicles: isSelected
                            ? prev.specificVehicles.filter((v) => v !== vehicle)
                            : [...prev.specificVehicles, vehicle],
                        }));
                      };
                      return (
                        <div
                          key={index}
                          className={`flex items-center space-x-4 py-2 cursor-pointer rounded-lg transition border-2 ${isSelected ? "border-primary bg-primary/10" : "border-transparent"}`}
                          onClick={handleSelect}
                        >
                          <img src={imageSrc} alt={model} className="w-32 h-32 object-cover rounded-xl border border-border/30 bg-muted" />
                          <span className={`font-medium text-base ${isSelected ? "text-primary" : ""}`}>{model}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium">Prediction Horizon</Label>
                  <Select
                    value={formData.predictionHorizon}
                    onValueChange={(value) => updateFormData("predictionHorizon", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">6 Months</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Confidence Threshold</Label>
                  <Select
                    value={formData.confidenceThreshold}
                    onValueChange={(value) => updateFormData("confidenceThreshold", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60% - More Predictions</SelectItem>
                      <SelectItem value="70">70% - Balanced</SelectItem>
                      <SelectItem value="75">75% - Recommended</SelectItem>
                      <SelectItem value="80">80% - Conservative</SelectItem>
                      <SelectItem value="90">90% - High Confidence Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Maintenance Types to Predict</Label>
                <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                  {maintenanceTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.maintenanceTypes.includes(type)}
                        onCheckedChange={() => toggleMaintenanceType(type)}
                      />
                      <Label htmlFor={type} className="text-sm">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Prediction Types</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cost-prediction"
                      checked={formData.includeCostPrediction}
                      onCheckedChange={(checked) => updateFormData("includeCostPrediction", checked)}
                    />
                    <Label htmlFor="cost-prediction" className="text-sm">
                      Cost Prediction
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="schedule-prediction"
                      checked={formData.includeSchedulePrediction}
                      onCheckedChange={(checked) => updateFormData("includeSchedulePrediction", checked)}
                    />
                    <Label htmlFor="schedule-prediction" className="text-sm">
                      Schedule Prediction
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="failure-prediction"
                      checked={formData.includeFailurePrediction}
                      onCheckedChange={(checked) => updateFormData("includeFailurePrediction", checked)}
                    />
                    <Label htmlFor="failure-prediction" className="text-sm">
                      Failure Risk Prediction
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Data Sources</Label>
                <p className="text-sm text-muted-foreground">
                  Select which data sources to include in the prediction models
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="historical-data"
                      checked={formData.useHistoricalData}
                      onCheckedChange={(checked) => updateFormData("useHistoricalData", checked)}
                    />
                    <div>
                      <Label htmlFor="historical-data" className="font-medium">
                        Historical Maintenance Data
                      </Label>
                      <p className="text-sm text-muted-foreground">Use past maintenance records and patterns</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">2.4M Records</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="manufacturer-specs"
                      checked={formData.useManufacturerSpecs}
                      onCheckedChange={(checked) => updateFormData("useManufacturerSpecs", checked)}
                    />
                    <div>
                      <Label htmlFor="manufacturer-specs" className="font-medium">
                        Manufacturer Specifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Include OEM maintenance schedules and intervals</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">15 Brands</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="driving-patterns"
                      checked={formData.useDrivingPatterns}
                      onCheckedChange={(checked) => updateFormData("useDrivingPatterns", checked)}
                    />
                    <div>
                      <Label htmlFor="driving-patterns" className="font-medium">
                        Driving Patterns & Usage
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Consider mileage, driving conditions, and usage patterns
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Active</Badge>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Ready to Generate Predictions</h3>
                <p className="text-muted-foreground">
                  Review your configuration and start the prediction generation process
                </p>
              </div>

              <Card className="border-border/50 bg-secondary/30">
                <CardHeader>
                  <CardTitle className="text-lg">Configuration Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vehicles:</span>
                    <span className="font-medium">
                      {formData.vehicleSelection === "all" ? "All Vehicles (247)" : "Selected Vehicles"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Horizon:</span>
                    <span className="font-medium">{formData.predictionHorizon} Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Confidence Threshold:</span>
                    <span className="font-medium">{formData.confidenceThreshold}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maintenance Types:</span>
                    <span className="font-medium">{formData.maintenanceTypes.length || "All Types"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Processing Time:</span>
                    <span className="font-medium text-primary">2-3 minutes</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="bg-transparent">
          Previous
        </Button>
        <Button onClick={handleNext} className="animate-glow">
          {currentStep === 4 ? "Generate Predictions" : "Next"}
        </Button>
      </div>
    </div>
  )
}
