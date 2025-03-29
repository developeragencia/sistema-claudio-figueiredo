import { createClient } from '@/lib/supabase-client';
import { type User } from '@supabase/supabase-js';

export async function getUsers() {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    return null;
  }

  return data;
}

export async function getUserById(id: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

export async function createUser(user: User, userData: any) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('users')
    .insert([{ id: user.id, ...userData }])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return data;
}

export async function deleteUser(id: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }

  return true;
} 