import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText,
  Database,
  Code,
  BarChart,
  Users,
  Settings
} from "lucide-react"

import { AuditsContent } from "./tabs/AuditsContent"
import { CreditsContent } from "./tabs/CreditsContent"
import { OverviewContent } from "./tabs/OverviewContent"
import { ReportsContent } from "./tabs/ReportsContent"
import { SettingsContent } from "./tabs/SettingsContent"
import { UsersContent } from "./tabs/UsersContent"

export function DocumentationContent() {
  return (
    <Tabs defaultValue="overview" className="h-full space-y-6">
      <div className="space-between flex items-center">
        <TabsList>
          <TabsTrigger value="overview">
            <FileText className="mr-2 h-4 w-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="credits">
            <Database className="mr-2 h-4 w-4" />
            Créditos
          </TabsTrigger>
          <TabsTrigger value="audits">
            <Code className="mr-2 h-4 w-4" />
            Auditorias
          </TabsTrigger>
          <TabsTrigger value="reports">
            <BarChart className="mr-2 h-4 w-4" />
            Relatórios
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="mr-2 h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="overview" className="border-none p-0">
        <OverviewContent />
      </TabsContent>
      <TabsContent value="credits" className="border-none p-0">
        <CreditsContent />
      </TabsContent>
      <TabsContent value="audits" className="border-none p-0">
        <AuditsContent />
      </TabsContent>
      <TabsContent value="reports" className="border-none p-0">
        <ReportsContent />
      </TabsContent>
      <TabsContent value="users" className="border-none p-0">
        <UsersContent />
      </TabsContent>
      <TabsContent value="settings" className="border-none p-0">
        <SettingsContent />
      </TabsContent>
    </Tabs>
  )
}
