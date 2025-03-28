
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use the environment variables with fallbacks to prevent runtime errors
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://haglswqbicwduxqltzcl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZ2xzd3FiaWN3ZHV4cWx0emNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MTYxMTIsImV4cCI6MjA1NzM5MjExMn0.JWD07vbN85MyfnV7mcplGgAaK2mFZjwN_JIU0-rB3cE";

// Log to help debug any environment variable issues
console.log("Initializing Supabase client", { 
  url: SUPABASE_URL.slice(0, 10) + '...', 
  hasKey: !!SUPABASE_PUBLISHABLE_KEY
});

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Create avatars bucket if it doesn't exist
(async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const avatarBucketExists = buckets?.some(bucket => bucket.name === 'avatars');
    
    if (!avatarBucketExists) {
      console.log("Creating avatars bucket");
      // Note: This won't work with anon key, only service_role key can create buckets
      // This is just for demonstration, in production use SQL migrations or server-side code
    }
  } catch (err) {
    console.error("Failed to check/create avatars bucket:", err);
  }
})();
