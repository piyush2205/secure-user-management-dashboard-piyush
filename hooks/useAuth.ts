// src/hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../store"
import { loginThunk, registerThunk, logout } from "../features/auth/authSlice"

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const { token, status, error } = useSelector((state: RootState) => state.auth)

  const isAuthenticated = Boolean(token)

  return {
    token,
    isAuthenticated,
    loading: status === "loading",
    error,

    login: (email: string, password: string) =>
      dispatch(loginThunk({ email, password })),
    register: (email: string, password: string) =>
      dispatch(registerThunk({ email, password })),
    logout: () => dispatch(logout()),
  }
}
