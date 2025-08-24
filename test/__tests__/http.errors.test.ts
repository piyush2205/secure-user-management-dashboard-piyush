import { describe, it, expect, beforeEach } from 'vitest'
import { api } from "../../lib/reqres"
import { server } from '../setupTests'
import { http, HttpResponse } from 'msw'


const API = 'https://reqres.in/api'


beforeEach(() => {
// by default handlers are OK; each test can override
})


describe('HTTP service errors', () => {
it('rejects login when server returns 400', async () => {
server.use(
http.post(`${API}/login`, () => HttpResponse.json({ error: 'invalid' }, { status: 400 }))
)
await expect(api.login({ email: '', password: '' })).rejects.toBeTruthy()
})


it('rejects register when server returns 400', async () => {
server.use(
http.post(`${API}/register`, () => HttpResponse.json({ error: 'invalid' }, { status: 400 }))
)
await expect(api.register({ email: '', password: '' })).rejects.toBeTruthy()
})
})