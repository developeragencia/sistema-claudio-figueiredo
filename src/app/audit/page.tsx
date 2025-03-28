import { Metadata } from "next"

import { AuditForm } from "@/components/audit/audit-form"
import { AuditTable } from "@/components/audit/audit-table"

export const metadata: Metadata = {
  title: "Auditoria | Secure Bridge Connect",
}

export default function AuditPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold">Auditoria</h1>
          <p className="text-muted-foreground">
            Consulte os pagamentos realizados e suas retenções.
          </p>
        </div>

        <AuditForm />
        <AuditTable />
      </div>
    </div>
  )
} 