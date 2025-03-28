
import React from 'react';

export interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  isExternal?: boolean;
  highlight?: boolean;
  new?: boolean;
}

export interface MenuGridProps {
  items: MenuItem[];
}
