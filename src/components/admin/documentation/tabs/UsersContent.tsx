import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UsersContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuários</CardTitle>
        <CardDescription>
          Gestão de usuários e permissões
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          O módulo de usuários permite gerenciar contas, perfis e níveis de acesso ao sistema.
        </p>
      </CardContent>
    </Card>
  )
}
