
import React from 'react';
import { User } from 'lucide-react';

interface MobileUserProfileProps {
  user: any;
}

const MobileUserProfile = ({ user }: MobileUserProfileProps) => {
  return (
    <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {user?.email?.split('@')[0] || 'admin'}
          </p>
          <div className="flex items-center mt-0.5">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-xs text-muted-foreground ml-1.5">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileUserProfile;
