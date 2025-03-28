import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SettingsContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações</CardTitle>
        <CardDescription>
          Configurações do sistema e preferências
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          O módulo de configurações permite personalizar o sistema de acordo com as necessidades da sua empresa.
        </p>
      </CardContent>
    </Card>
  )
}
