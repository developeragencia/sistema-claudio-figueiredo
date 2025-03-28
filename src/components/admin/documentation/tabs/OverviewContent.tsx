import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function OverviewContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral</CardTitle>
        <CardDescription>
          Introdução ao sistema de gestão tributária
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          O sistema oferece uma solução completa para gestão tributária, incluindo análise de créditos, auditoria de pagamentos e geração de relatórios.
        </p>
      </CardContent>
    </Card>
  )
}
