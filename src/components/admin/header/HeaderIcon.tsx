import { LucideIcon } from "lucide-react"

interface HeaderIconProps {
  icon: LucideIcon
  className?: string
}

export function HeaderIcon({ icon: Icon, className }: HeaderIconProps) {
  return (
    <div className="flex items-center justify-center">
      <Icon className={className} />
    </div>
  )
}
