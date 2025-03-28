import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CreditsContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Créditos Tributários</CardTitle>
        <CardDescription>
          Gestão de créditos e compensações tributárias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          O módulo de créditos permite o gerenciamento completo de créditos tributários, incluindo análise, compensação e acompanhamento.
        </p>
      </CardContent>
    </Card>
  )
}
