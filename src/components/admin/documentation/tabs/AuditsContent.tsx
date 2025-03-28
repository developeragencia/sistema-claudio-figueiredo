import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AuditsContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Auditorias</CardTitle>
        <CardDescription>
          Sistema de auditoria de pagamentos e retenções
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          O módulo de auditoria permite o monitoramento e análise detalhada de todos os pagamentos e retenções tributárias.
        </p>
      </CardContent>
    </Card>
  )
}
