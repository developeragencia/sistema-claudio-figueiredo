"use client"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="grid grid-cols-3 gap-[2px]">
        <div className="h-5 w-5 bg-gray-800" />
        <div className="h-5 w-5 bg-white border border-gray-800" />
        <div className="h-5 w-5 bg-gray-800" />
        <div className="h-5 w-5 bg-gray-800" />
        <div className="h-5 w-5 bg-white border border-gray-800" />
        <div className="h-5 w-5 bg-gray-800" />
        <div className="h-5 w-5 bg-gray-800" />
        <div className="h-5 w-5 bg-white border border-gray-800" />
        <div className="h-5 w-5 bg-gray-800" />
      </div>
      <span className="text-xl font-medium tracking-wider text-gray-800">
        ADVOGADOS ASSOCIADOS
      </span>
    </div>
  )
} 