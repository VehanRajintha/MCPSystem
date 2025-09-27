"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Car, AlertCircle, ArrowLeft, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate password reset request
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 p-4">
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-green-500/10 border border-green-500/20">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Check Your Email</h2>
              <p className="text-muted-foreground mt-2">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the
                instructions to reset your password.
              </p>
            </div>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/auth/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setSuccess(false)
                  setEmail("")
                }}
              >
                Try Different Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Punchi Car Niwasa</h1>
              <p className="text-sm text-muted-foreground">Maintenance Prediction System</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Reset Password</h2>
            <p className="text-muted-foreground">Enter your email to receive a reset link</p>
          </div>
        </div>

        {/* Forgot Password Form */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Forgot Password
            </CardTitle>
            <CardDescription>We'll send you a link to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-600">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary/50 border-border"
                />
                <p className="text-xs text-muted-foreground">Enter the email address associated with your account</p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending Reset Link...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Send Reset Link
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <h3 className="font-medium text-foreground mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              If you don't receive the email within a few minutes, please check your spam folder or contact your system
              administrator for assistance.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
