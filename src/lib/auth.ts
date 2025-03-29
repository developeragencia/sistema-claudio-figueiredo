import { createClient } from './supabase-server';

export async function getSession() {
  const supabase = createClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createClient();
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function signOut() {
  const supabase = createClient();
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error:', error);
  }
} 