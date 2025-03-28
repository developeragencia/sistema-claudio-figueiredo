import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DocumentationHeader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentação</CardTitle>
        <CardDescription>
          Guia completo do sistema de gestão tributária
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Bem-vindo à documentação do sistema. Aqui você encontrará informações detalhadas sobre todas as funcionalidades disponíveis.
        </p>
      </CardContent>
    </Card>
  )
}
