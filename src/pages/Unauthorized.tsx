import { Link  } from "@/hooks/use-router"
import { Button } from '@/components/ui/button'

export function Unauthorized() {
  return (
    <div className="flex h-[100vh] flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">401</h1>
      <p className="text-xl text-muted-foreground">Acesso não autorizado</p>
      <Button asChild>
        <Link to="/">Voltar para o início</Link>
      </Button>
    </div>
  )
}
