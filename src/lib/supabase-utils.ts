import { createClient } from '@/lib/supabase-client';
import { type User } from '@supabase/supabase-js';

export async function getUserProfile(user: User) {
  const supabase = createClient();
  
  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return profile;
}

export async function updateUserProfile(user: User, updates: any) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }

  return data;
}

export async function uploadAvatar(user: User, file: File) {
  const supabase = createClient();
  
  const fileExt = file.name.split('.').pop();
  const filePath = `${user.id}-${Math.random()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Error uploading avatar:', uploadError);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);

  const { data: profile, error: updateError } = await supabase
    .from('users')
    .update({ avatar_url: publicUrl })
    .eq('id', user.id)
    .select()
    .single();

  if (updateError) {
    console.error('Error updating user avatar:', updateError);
    return null;
  }

  return profile;
} 