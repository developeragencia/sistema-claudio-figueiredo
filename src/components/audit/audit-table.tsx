"use client"

import { useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card } from "@/components/ui/card"
import { Loading } from "@/components/ui/loading"
import { formatCurrency } from "@/lib/utils"

interface Payment {
  id: string
  supplier: {
    name: string
    document: string
  }
  amount: number
  status: "pending" | "paid" | "cancelled"
  createdAt: string
  taxRetention: {
    amount: number
  }[]
}

const mockData: Payment[] = [
  {
    id: "1",
    supplier: {
      name: "Fornecedor 1",
      document: "12.345.678/0001-90",
    },
    amount: 1000.0,
    status: "pending",
    createdAt: "2024-01-01T00:00:00.000Z",
    taxRetention: [
      {
        amount: 100.0,
      },
    ],
  },
  {
    id: "2",
    supplier: {
      name: "Fornecedor 2",
      document: "98.765.432/0001-10",
    },
    amount: 2000.0,
    status: "paid",
    createdAt: "2024-01-02T00:00:00.000Z",
    taxRetention: [
      {
        amount: 200.0,
      },
    ],
  },
]

export function AuditTable() {
  const [loading] = useState(false)

  if (loading) {
    return <Loading />
  }

  return (
    <Card>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fornecedor</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Retenção</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((payment) => {
              const totalRetention = payment.taxRetention.reduce(
                (acc, curr) => acc + curr.amount,
                0
              )

              return (
                <TableRow key={payment.id}>
                  <TableCell>{payment.supplier.name}</TableCell>
                  <TableCell>{payment.supplier.document}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>{formatCurrency(totalRetention)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        payment.status === "pending"
                          ? "bg-yellow-50 text-yellow-800"
                          : payment.status === "paid"
                          ? "bg-green-50 text-green-800"
                          : "bg-red-50 text-red-800"
                      }`}
                    >
                      {payment.status === "pending"
                        ? "Pendente"
                        : payment.status === "paid"
                        ? "Pago"
                        : "Cancelado"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(payment.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  )
} 