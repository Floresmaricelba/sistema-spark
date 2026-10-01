import type { LoginResponse } from '../types/api';

const TOKEN_KEY = 'spark_fit_auth_token';
const USER_KEY = 'spark_fit_auth_user';

export function saveSession(session: LoginResponse) {
  localStorage.setItem(TOKEN_KEY, session.token);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): LoginResponse['user'] | null {
  const value = localStorage.getItem(USER_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as LoginResponse['user'];
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function requireSession() {
  if (!getToken()) window.location.replace('/login');
}
