// src/test/authSlice.test.ts
import { describe, it, expect, vi } from "vitest"
import { configureStore } from "@reduxjs/toolkit"
import reducer, { loginThunk, registerThunk, logout } from "../features/auth/authSlice"
import * as reqres from "../lib/reqres"

function setupStore() {
  return configureStore({ reducer: { auth: reducer } })
}

describe("authSlice", () => {
  // Mock localStorage
  beforeEach(() => {
    vi.spyOn(Storage.prototype, "setItem")
    vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null)
    vi.spyOn(Storage.prototype, "removeItem")
  })

  it("should handle registerThunk", async () => {
    vi.spyOn(reqres, "registerUser").mockResolvedValue({ token: "mock-token" })

    const store = setupStore()
    const result = await store.dispatch(registerThunk({ email: "a@b.com", password: "123" }))
    
    expect(result.payload).toEqual({ email: "a@b.com", token: "mock-token" })
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "mock-token")
  })

  it("should handle loginThunk", async () => {
    vi.spyOn(reqres, "loginUser").mockResolvedValue({ token: "mock-token" })

    const store = setupStore()
    const result = await store.dispatch(loginThunk({ email: "a@b.com", password: "123" }))
    
    expect(result.payload).toEqual({ email: "a@b.com", token: "mock-token" })
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "mock-token")
  })

  it("should handle logout", () => {
    const store = setupStore()
    store.dispatch(logout())
    const state = store.getState().auth
    expect(state.token).toBeNull()
    expect(state.user).toBeNull()
    expect(localStorage.removeItem).toHaveBeenCalledWith("token")
  })
})
