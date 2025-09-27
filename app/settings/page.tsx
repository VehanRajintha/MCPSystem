"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in-up max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account, preferences, and platform configuration</p>
      </div>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Update your personal information and password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="name">Name</label>
            <Input id="name" placeholder="Your name" defaultValue="John Smith" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="Your email" defaultValue="john.smith@email.com" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="password">Password</label>
            <Input id="password" type="password" placeholder="New password" />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" className="bg-primary text-primary-foreground">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Dark Mode</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Email Notifications</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">SMS Alerts</span>
            <Switch />
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Platform Configuration</CardTitle>
          <CardDescription>System-wide settings and controls</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="timezone">Timezone</label>
            <Input id="timezone" placeholder="e.g. GMT+5:30" defaultValue="GMT+5:30" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="language">Language</label>
            <Input id="language" placeholder="e.g. English" defaultValue="English" />
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" className="bg-primary text-primary-foreground">Update Configuration</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
