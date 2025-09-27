"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarDays, MapPin, User, Wrench } from "lucide-react"

export default function SchedulePage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Schedule Maintenance</h1>
        <p className="text-muted-foreground">Book a maintenance appointment for your vehicle</p>
      </div>
      <Card className="max-w-xl mx-auto border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Book Service</CardTitle>
          <CardDescription>Fill out the form below to schedule your maintenance</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="vehicle">Vehicle</label>
              <Input id="vehicle" placeholder="e.g. 2019 Toyota Camry" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="service">Service Type</label>
              <Input id="service" placeholder="e.g. Brake Pad Replacement" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="date">Preferred Date</label>
              <Input id="date" type="date" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="location">Service Location</label>
              <Input id="location" placeholder="e.g. Authorized Dealer" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="technician">Technician (optional)</label>
              <Input id="technician" placeholder="e.g. Alex Perera" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="notes">Notes (optional)</label>
              <Input id="notes" placeholder="Any special instructions..." />
            </div>
            <div className="flex justify-end pt-2 gap-2">
              <Button variant="secondary" type="reset">Cancel</Button>
              <Button type="submit" className="bg-primary text-primary-foreground">Confirm Booking</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
