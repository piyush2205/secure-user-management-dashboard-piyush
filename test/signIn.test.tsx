import { render, screen, fireEvent, } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import reducer from '../features/auth/authSlice'
import SignIn from '../pages/SignIn'
import { MemoryRouter, Routes, Route } from 'react-router-dom'


function renderWithStore() {
const store = configureStore({ reducer: { auth: reducer } })
return render(
<Provider store={store}>
<MemoryRouter initialEntries={["/signin"]}>
<Routes>
<Route path="/signin" element={<SignIn />} />
<Route path="/dashboard" element={<div>dashboard</div>} />
</Routes>
</MemoryRouter>
</Provider>
)
}


describe('SignIn Page', () => {
it('renders form and logs in', async () => {
renderWithStore()
fireEvent.click(screen.getByRole('button', { name: /sign in/i }))



})
})