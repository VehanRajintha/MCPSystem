"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface AddVehicleFormProps {
  onClose: () => void
}

export function AddVehicleForm({ onClose }: AddVehicleFormProps) {
  const [formData, setFormData] = useState({
    vin: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    engineSize: "",
    fuelType: "",
    transmission: "",
    color: "",
    purchasePrice: "",
    ownerName: "",
    ownerContact: "",
    condition: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Vehicle Information */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Vehicle Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vin">VIN Number *</Label>
              <Input
                id="vin"
                placeholder="Enter 17-character VIN"
                value={formData.vin}
                onChange={(e) => handleInputChange("vin", e.target.value)}
                maxLength={17}
                className="font-mono"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                type="number"
                placeholder="2020"
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                min="1900"
                max="2025"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="make">Make *</Label>
              <Select onValueChange={(value) => handleInputChange("make", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="chevrolet">Chevrolet</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                  <SelectItem value="volkswagen">Volkswagen</SelectItem>
                  <SelectItem value="nissan">Nissan</SelectItem>
                  <SelectItem value="hyundai">Hyundai</SelectItem>
                  <SelectItem value="kia">Kia</SelectItem>
                  <SelectItem value="mazda">Mazda</SelectItem>
                  <SelectItem value="subaru">Subaru</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                placeholder="Camry, Accord, etc."
                value={formData.model}
                onChange={(e) => handleInputChange("model", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mileage">Current Mileage</Label>
              <Input
                id="mileage"
                type="number"
                placeholder="50000"
                value={formData.mileage}
                onChange={(e) => handleInputChange("mileage", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                placeholder="Silver, Black, White, etc."
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Technical Specifications</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="engineSize">Engine Size (L)</Label>
              <Input
                id="engineSize"
                type="number"
                step="0.1"
                placeholder="2.4"
                value={formData.engineSize}
                onChange={(e) => handleInputChange("engineSize", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType">Fuel Type</Label>
              <Select onValueChange={(value) => handleInputChange("fuelType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasoline">Gasoline</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="plugin-hybrid">Plug-in Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <Select onValueChange={(value) => handleInputChange("transmission", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatic">Automatic</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="cvt">CVT</SelectItem>
                  <SelectItem value="dual-clutch">Dual Clutch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Owner & Financial Information */}
      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Owner & Financial Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input
                id="ownerName"
                placeholder="John Smith"
                value={formData.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerContact">Owner Contact</Label>
              <Input
                id="ownerContact"
                placeholder="Phone or email"
                value={formData.ownerContact}
                onChange={(e) => handleInputChange("ownerContact", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
              <Input
                id="purchasePrice"
                type="number"
                placeholder="25000"
                value={formData.purchasePrice}
                onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition Rating (1-10)</Label>
              <Select onValueChange={(value) => handleInputChange("condition", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Rate condition" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} - {i + 1 <= 3 ? "Poor" : i + 1 <= 6 ? "Fair" : i + 1 <= 8 ? "Good" : "Excellent"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about the vehicle..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="animate-glow">
          Add Vehicle
        </Button>
      </div>
    </form>
  )
}
