import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1_2)">
          <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="#1E293B"/>
          <path d="M16 4L28 16L16 28L4 16L16 4Z" fill="#FFFFFF"/>
          <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="#1E293B"/>
        </g>
        <defs>
          <clipPath id="clip0_1_2">
            <rect width="32" height="32" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <span className="font-bold text-xl text-slate-800 dark:text-slate-200">
        Advogados Associados
      </span>
    </div>
  );
} 