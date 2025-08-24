// src/test/protectedRoute.test.tsx
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import reducer from "../features/auth/authSlice"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "../routes/ProtectedRoute"
import { describe, it, expect } from "vitest"

function renderWithToken(token: string | null) {
  const store = configureStore({
    reducer: { auth: reducer },
    preloadedState: { auth: { token, user: token ? { email: "test@test.com" } : null, status: "idle", error: null } }
  })

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route path="/signin" element={<div>signin-page</div>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <div>dashboard-page</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
}

describe("ProtectedRoute", () => {
  it("redirects to /signin if not authenticated", () => {
    renderWithToken(null)
    expect(screen.getByText("signin-page")).toBeInTheDocument()
  })

  it("renders dashboard if authenticated", () => {
    renderWithToken("mock-token")
    expect(screen.getByText("dashboard-page")).toBeInTheDocument()
  })
})
