"use client";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

export default function CostsPage() {
  // Placeholder for costs data
  type Cost = { id: number; type: string; amount: number; date: string; status: string };
  const costs: Cost[] = [
    { id: 1, type: "Maintenance", amount: 120, date: "2025-09-01", status: "Paid" },
    { id: 2, type: "Repair", amount: 350, date: "2025-08-15", status: "Pending" },
    { id: 3, type: "Insurance", amount: 800, date: "2025-07-10", status: "Paid" },
  ];
  const [selectedCost, setSelectedCost] = useState<Cost | null>(null);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Vehicle Costs</h1>
      <Separator className="mb-6" />
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card className="p-4">
            <Table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {costs.map((cost) => (
                  <tr key={cost.id}>
                    <td>{cost.type}</td>
                    <td>${cost.amount}</td>
                    <td>{cost.date}</td>
                    <td>
                      <Badge variant={cost.status === "Paid" ? "default" : "secondary"}>{cost.status}</Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="outline" onClick={() => setSelectedCost(cost)}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="paid">
          <Card className="p-4">
            <Table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {costs.filter((c) => c.status === "Paid").map((cost) => (
                  <tr key={cost.id}>
                    <td>{cost.type}</td>
                    <td>${cost.amount}</td>
                    <td>{cost.date}</td>
                    <td>
                      <Badge variant="default">Paid</Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="outline" onClick={() => setSelectedCost(cost)}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card className="p-4">
            <Table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {costs.filter((c) => c.status === "Pending").map((cost) => (
                  <tr key={cost.id}>
                    <td>{cost.type}</td>
                    <td>${cost.amount}</td>
                    <td>{cost.date}</td>
                    <td>
                      <Badge variant="secondary">Pending</Badge>
                    </td>
                    <td>
                      <Button size="sm" variant="outline" onClick={() => setSelectedCost(cost)}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Details Sheet */}
      <Sheet open={!!selectedCost} onOpenChange={() => setSelectedCost(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Cost Details</SheetTitle>
          </SheetHeader>
          {selectedCost ? (
            <div className="space-y-4 mt-4">
              <Alert>
                <div>
                  <strong>Type:</strong> {selectedCost.type}
                </div>
                <div>
                  <strong>Amount:</strong> ${selectedCost.amount}
                </div>
                <div>
                  <strong>Date:</strong> {selectedCost.date}
                </div>
                <div>
                  <strong>Status:</strong> <Badge variant={selectedCost.status === "Paid" ? "default" : "secondary"}>{selectedCost.status}</Badge>
                </div>
              </Alert>
              <Button onClick={() => setSelectedCost(null)} variant="secondary">Close</Button>
            </div>
          ) : (
            <Skeleton className="h-32 w-full" />
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}
