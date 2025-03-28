import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ReportsContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios</CardTitle>
        <CardDescription>
          Sistema de geração e análise de relatórios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          O módulo de relatórios permite a geração e análise de diversos tipos de relatórios, incluindo análises financeiras e tributárias.
        </p>
      </CardContent>
    </Card>
  )
}
