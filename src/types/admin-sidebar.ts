
export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface SidebarSection {
  id: string;
  title: string;
  items: SidebarItem[];
}

export type ExpandedSection = string | null;
