
// Utility functions for handling color transformations in the menu grid

/**
 * Get base card styles (neutral, without hover effects)
 */
export const getBaseCardStyles = (color: string) => {
  // Map of base card styles (neutral, without gradients)
  const baseColorMap: Record<string, string> = {
    'bg-blue-600/10': 'bg-muted/40 border-blue-500/20',
    'bg-purple-600/10': 'bg-muted/40 border-purple-500/20',
    'bg-green-600/10': 'bg-muted/40 border-green-500/20',
    'bg-yellow-600/10': 'bg-muted/40 border-yellow-500/20',
    'bg-red-600/10': 'bg-muted/40 border-red-500/20',
    'bg-pink-600/10': 'bg-muted/40 border-pink-500/20',
    'bg-indigo-600/10': 'bg-muted/40 border-indigo-500/20',
    'bg-teal-600/10': 'bg-muted/40 border-teal-500/20',
    'bg-orange-600/10': 'bg-muted/40 border-orange-500/20',
    'bg-cyan-600/10': 'bg-muted/40 border-cyan-500/20',
  };
  
  return baseColorMap[color] || 'bg-muted/40 border-primary/20';
};

/**
 * Get hover gradient styles that only appear on hover/active
 */
export const getHoverGradientStyles = (color: string) => {
  // Map of hover gradient styles
  const hoverColorMap: Record<string, string> = {
    'bg-blue-600/10': 'group-hover:bg-gradient-to-br group-hover:from-blue-500/30 group-hover:to-blue-700/30 group-active:from-blue-500/40 group-active:to-blue-700/40',
    'bg-purple-600/10': 'group-hover:bg-gradient-to-br group-hover:from-purple-500/30 group-hover:to-purple-700/30 group-active:from-purple-500/40 group-active:to-purple-700/40',
    'bg-green-600/10': 'group-hover:bg-gradient-to-br group-hover:from-green-500/30 group-hover:to-green-700/30 group-active:from-green-500/40 group-active:to-green-700/40',
    'bg-yellow-600/10': 'group-hover:bg-gradient-to-br group-hover:from-yellow-500/30 group-hover:to-yellow-700/30 group-active:from-yellow-500/40 group-active:to-yellow-700/40',
    'bg-red-600/10': 'group-hover:bg-gradient-to-br group-hover:from-red-500/30 group-hover:to-red-700/30 group-active:from-red-500/40 group-active:to-red-700/40',
    'bg-pink-600/10': 'group-hover:bg-gradient-to-br group-hover:from-pink-500/30 group-hover:to-pink-700/30 group-active:from-pink-500/40 group-active:to-pink-700/40',
    'bg-indigo-600/10': 'group-hover:bg-gradient-to-br group-hover:from-indigo-500/30 group-hover:to-indigo-700/30 group-active:from-indigo-500/40 group-active:to-indigo-700/40',
    'bg-teal-600/10': 'group-hover:bg-gradient-to-br group-hover:from-teal-500/30 group-hover:to-teal-700/30 group-active:from-teal-500/40 group-active:to-teal-700/40',
    'bg-orange-600/10': 'group-hover:bg-gradient-to-br group-hover:from-orange-500/30 group-hover:to-orange-700/30 group-active:from-orange-500/40 group-active:to-orange-700/40',
    'bg-cyan-600/10': 'group-hover:bg-gradient-to-br group-hover:from-cyan-500/30 group-hover:to-cyan-700/30 group-active:from-cyan-500/40 group-active:to-cyan-700/40',
  };
  
  return hoverColorMap[color] || 'group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/30 group-active:from-primary/30 group-active:to-primary/40';
};

/**
 * Extract color from the gradient bg class for icon background
 */
export const getIconColorFromGradient = (color: string): string => {
  // Map color class to corresponding hsl var
  const colorMap: Record<string, string> = {
    'bg-blue-600/10': 'hsl(var(--primary))',
    'bg-purple-600/10': 'hsl(var(--primary))',
    'bg-green-600/10': 'hsl(var(--primary))',
    'bg-yellow-600/10': 'hsl(var(--primary))',
    'bg-red-600/10': 'hsl(var(--primary))',
    'bg-pink-600/10': 'hsl(var(--primary))',
    'bg-indigo-600/10': 'hsl(var(--primary))',
    'bg-teal-600/10': 'hsl(var(--primary))',
    'bg-orange-600/10': 'hsl(var(--primary))',
    'bg-cyan-600/10': 'hsl(var(--primary))',
  };
  
  return colorMap[color] || 'hsl(var(--primary))';
};
