import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface TabTitleSectionProps {
  icon: LucideIcon
  title: string
  description: string
}

export function TabTitleSection({ icon: Icon, title, description }: TabTitleSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border/40"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}
