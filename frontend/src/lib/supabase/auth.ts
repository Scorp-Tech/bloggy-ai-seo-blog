import { supabase } from './client';
import { AuthError } from '@supabase/supabase-js';

interface SignUpData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function signUp({ email, password, name }: SignUpData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }: LoginData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return session;
}

export async function refreshSession() {
  const { data: { session }, error } = await supabase.auth.refreshSession();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return session;
} 