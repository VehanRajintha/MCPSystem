import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { AuthGuard } from "@/components/auth/auth-guard"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Punchi Car Niwasa - Maintenance Cost Prediction System",
  description: "Advanced automotive maintenance cost prediction and management system",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <AuthGuard>
          <div className="flex h-screen bg-background">
            <Suspense fallback={<div>Loading...</div>}>
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </Suspense>
          </div>
        </AuthGuard>
        <Analytics />
      </body>
    </html>
  )
}
