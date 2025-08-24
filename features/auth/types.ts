export type AuthState = {
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type LoginPayload = { email: string; password: string }
export type RegisterPayload = { email: string; password: string }