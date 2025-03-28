
import React from 'react';
import TabTitleSection from './header/TabTitleSection';
import { tabConfigurations } from './header/tabConfigurations';

interface AdminTabHeaderProps {
  activeTab: string;
}

const AdminTabHeader = ({ activeTab }: AdminTabHeaderProps) => {
  // Get the configuration for the active tab
  const tabConfig = tabConfigurations[activeTab];
  
  // If we have a configuration for this tab, render the title section
  if (tabConfig) {
    return (
      <TabTitleSection 
        Icon={tabConfig.icon}
        title={tabConfig.title}
        description={tabConfig.description}
      />
    );
  }
  
  // If no configuration is found, return null or a default component
  return null;
};

export default AdminTabHeader;
