
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationsHeader from '@/components/notifications/NotificationsHeader';
import NotificationsList from '@/components/notifications/NotificationsList';
import EmptyNotifications from '@/components/notifications/EmptyNotifications';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { 
    notifications,
    hasUnreadNotifications,
    handleNotificationClick,
    handleRemove,
    handleClearAll,
    handleMarkAllAsRead
  } = useNotifications();

  const handleNavigateToLink = (id: string, link?: string) => {
    const navigateToLink = handleNotificationClick(id, link);
    if (navigateToLink) {
      navigate(navigateToLink);
    }
  };

  return (
    <AdminLayout activeTab="notifications">
      <div className="container mx-auto p-4 sm:p-6">
        <NotificationsHeader 
          hasNotifications={notifications.length > 0}
          hasUnreadNotifications={hasUnreadNotifications}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
        />

        {notifications.length > 0 ? (
          <NotificationsList 
            notifications={notifications}
            onNotificationClick={handleNavigateToLink}
            onRemove={handleRemove}
          />
        ) : (
          <EmptyNotifications />
        )}
      </div>
    </AdminLayout>
  );
};

export default NotificationsPage;
