// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginUser, registerUser } from "../../lib/reqres"

// LOGIN
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await loginUser() // call your API
    // Save token to localStorage
    localStorage.setItem("token", response.token)
    return { email, token: response.token }
  }
)

// REGISTER
export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await registerUser()
    // Save token to localStorage
    localStorage.setItem("token", response.token)
    // Return email and token so Redux is updated and user can be considered logged in
    return { email, token: response.token }
  }
)

interface AuthState {
  user: null | { email: string }
  token: string | null
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  status: "idle",
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem("token")
    },
  },

  
})

export const { logout } = authSlice.actions
export default authSlice.reducer
